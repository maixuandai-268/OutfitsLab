/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class IssueReportService {
    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>,
    ) { }

    async create(reportDto: ReportDto): Promise<Report> {
        return this.reportRepository.save(reportDto);
    }

    async findAll(): Promise<Report[]> {
        return this.reportRepository.find({ order: { createdAt: 'DESC' } });
    }

    async findById(id: number): Promise<Report> {
        const report = await this.reportRepository.findOneBy({ id });
        if (!report) {
            throw new NotFoundException(`Report with ID ${id} not found.`);
        }
        return report;
    }

    async findByUserId(userId: number): Promise<Report[]> {
        return this.reportRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' }
        });
    }

    async update(id: number, reportDto: Partial<ReportDto>): Promise<Report> {
        await this.findById(id);
        await this.reportRepository.update(id, reportDto);
        return this.findById(id);
    }

    async updateStatus(
        id: number,
        status: 'pending' | 'in_progress' | 'resolved' | 'rejected'
    ): Promise<Report> {
        await this.findById(id);
        await this.reportRepository.update(id, { status });
        return this.findById(id);
    }

    async delete(id: number): Promise<{ message: string }> {
        const report = await this.findById(id);
        await this.reportRepository.remove(report);
        return { message: `Report with ID ${id} deleted successfully.` };
    }

    async takeReport(id: number, adminId: number): Promise<Report> {
        console.log(`Service: Taking report ${id} for admin ${adminId}`);
        const report = await this.findById(id);
        console.log(`Service: Found report with status: ${report.status}`);

        if (report.status !== 'pending') {
            throw new Error(`Only pending reports can be taken. Current status: ${report.status}`);
        }

        await this.reportRepository.update(id, {
            status: 'in_progress',
            handledBy: adminId,
        });

        return this.findById(id);
    }

    async handleReport(
        id: number,
        adminId: number,
        action: 'resolved' | 'rejected',
        note: string,
    ): Promise<Report> {
        const report = await this.findById(id);

        if (report.status !== 'in_progress') {
            throw new Error(`Only reports in progress can be handled. Current status: ${report.status}`);
        }

        if (report.handledBy !== adminId) {
            throw new Error(`You are not assigned to this report`);
        }

        await this.reportRepository.update(id, {
            status: action,
            note,
            handledAt: new Date(),
        });

        return this.findById(id);
    }
}