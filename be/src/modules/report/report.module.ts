/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueReportController } from './report.controller';
import { IssueReportService } from './report.service';
import { Report } from './report.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Report])],
    controllers: [IssueReportController],
    providers: [IssueReportService],
    exports: [IssueReportService],
})
export class IssueReportModule { }