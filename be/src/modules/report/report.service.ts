/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class IssueReportService {
    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>,
    ) {}

    async create(report: Report): Promise<Report> {
        return this.reportRepository.save(report);
    }

    async findAll(): Promise<Report[]> {
        return this.reportRepository.find();
    }

    async findById(id: number): Promise<Report | null> {  // Chấp nhận null
        const report = await this.reportRepository.findOneBy({ id });
        if (!report) {
            throw new NotFoundException(`Report with ID ${id} not found.`);
        }
        return report;
    }
}