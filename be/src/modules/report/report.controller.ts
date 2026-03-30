/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get, Put, Patch, Delete, Param, Req, BadRequestException, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { IssueReportService } from './report.service';
import { ReportDto, HandleReportDto } from './dto/report.dto'; // Import DTOs

@Controller('reports')
export class IssueReportController {
    constructor(private readonly issueReportService: IssueReportService) { }

    /**
     * Extract user ID from Bearer token
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private extractUserIdFromRequest(req: any): number {
        // Try to get from req.user first (if auth middleware is set)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (req.user?.id) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
            return req.user.id;
        }

        // Extract from Authorization header
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const authHeader = req.headers?.authorization || req.headers?.Authorization;
        if (!authHeader) {
            throw new BadRequestException('Missing Authorization header');
        }

        // Format: "Bearer <token>" or token as plain user ID
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        const parts = authHeader.split(' ');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        const token = parts.length === 2 ? parts[1] : authHeader;

        // Try to parse as number (simple case where token is just user ID)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const userId = parseInt(token, 10);
        if (!isNaN(userId)) {
            return userId;
        }

        // If token is JWT-like, try to extract from it
        // This is a simple extraction - in production, validate the JWT properly
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
            const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (decoded.id) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
                return decoded.id;
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
            if (decoded.sub) return parseInt(decoded.sub, 10);
        } catch (err) {
            console.error('Failed to decode token:', err);
        }

        throw new BadRequestException('Invalid or missing user ID in token');
    }

    @Post()
    async createReport(@Body() reportDto: ReportDto, @Req() req: any) {
        let userId = reportDto.userId;

        // Try to get userId from request if not provided in DTO
        if (!userId) {
            try {
                userId = this.extractUserIdFromRequest(req);
            } catch (err) {
                // If extraction fails, use the DTO userId or throw error
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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