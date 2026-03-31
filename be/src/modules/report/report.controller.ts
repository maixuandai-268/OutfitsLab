/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Put, Patch, Delete, Param, Req, BadRequestException, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { IssueReportService } from './report.service';
import { ReportDto, HandleReportDto } from './dto/report.dto';
@Controller('reports')
export class IssueReportController {
    constructor(private readonly issueReportService: IssueReportService) { }

    private extractUserIdFromRequest(req: any): number {
        if (req.user?.id) {
            return req.user.id;
        }
        const authHeader = req.headers?.authorization || req.headers?.Authorization;
        if (!authHeader) {
            throw new BadRequestException('Missing Authorization header');
        }
        const parts = authHeader.split(' ');
        const token = parts.length === 2 ? parts[1] : authHeader;
        const userId = parseInt(token, 10);
        if (!isNaN(userId)) {
            return userId;
        }
        try {
            const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            if (decoded.id) {
                return decoded.id;
            }
            if (decoded.sub) return parseInt(decoded.sub, 10);
        } catch (err) {
            console.error('Failed to decode token:', err);
        }
        throw new BadRequestException('Invalid or missing user ID in token');
    }

    @Post()
    async createReport(@Body() reportDto: ReportDto, @Req() req: any) {
        let userId = reportDto.userId;
        if (!userId) {
            try {
                userId = this.extractUserIdFromRequest(req);
            } catch (err) {
                if (!reportDto.userId) {
                    throw err;
                }
            }
        }
        return await this.issueReportService.create({ ...reportDto, userId });
    }

    @Get()
    async getAllReport() {
        return await this.issueReportService.findAll();
    }

    @Get('user/:userId')
    async getReportByUser(@Param('userId') userId: number) {
        return await this.issueReportService.findByUserId(userId);
    }

    @Get(':id')
    async getReportById(@Param('id', ParseIntPipe) id: number) {
        return await this.issueReportService.findById(id);
    }

    @Put(':id')
    async updateReport(
        @Param('id', ParseIntPipe) id: number,
        @Body() reportDto: Partial<ReportDto>
    ) {
        return await this.issueReportService.update(id, reportDto);
    }

    @Patch(':id/status')
    async updateReportStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { status: 'pending' | 'in_progress' | 'resolved' | 'rejected' }
    ) {
        return await this.issueReportService.updateStatus(id, body.status);
    }

    @Patch(':id/take')
    async takeReport(
        @Param('id', ParseIntPipe) id: number,
        @Req() req: any
    ): Promise<any> {
        try {
            const adminId = this.extractUserIdFromRequest(req);
            console.log(`Taking report ${id} for admin ${adminId}`);
            const result = await this.issueReportService.takeReport(id, adminId);
            return result;
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to take report';
            console.error(`Error taking report ${id}:`, errorMsg);
            if (err instanceof NotFoundException || err instanceof BadRequestException) {
                throw err;
            }
            throw new BadRequestException(errorMsg);
        }
    }

    @Patch(':id/handle')
    async handleReport(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: HandleReportDto,
        @Req() req: any
    ): Promise<any> {
        try {
            const adminId = this.extractUserIdFromRequest(req);
            console.log(`Handling report ${id} for admin ${adminId}:`, body);
            const result = await this.issueReportService.handleReport(id, adminId, body.action, body.note);
            return result;
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : 'Failed to handle report';
            console.error(`Error handling report ${id}:`, errorMsg);
            if (err instanceof NotFoundException || err instanceof BadRequestException) {
                throw err;
            }
            throw new BadRequestException(errorMsg);
        }
    }

    @Delete(':id')
    async deleteReport(@Param('id', ParseIntPipe) id: number) {
        return await this.issueReportService.delete(id);
    }
}