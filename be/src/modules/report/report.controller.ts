/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { IssueReportService } from './report.service';
import { ReportDto } from './dto/report.dto'; // Import DTO

@Controller('api/report-issue')
export class IssueReportController {
    constructor(private readonly issueReportService: IssueReportService) {}

    @Post()
    async reportIssue(@Body() ReportDto: ReportDto) {
        return this.issueReportService.create(ReportDto);
    }

    @Get()
    async getAllIssues() {
        return this.issueReportService.findAll();
    }

    @Get(':id')
    async getIssueById(@Param('id') id: number) {
        return this.issueReportService.findById(id);
    }
}