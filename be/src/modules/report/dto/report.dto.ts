/* eslint-disable prettier/prettier */
import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsOptional,
    IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
    @ApiProperty({
        description: 'Report title',
        example: 'Product not displaying correctly',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Detailed description of the issue',
        example: 'The product image is not loading...',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        description: 'Severity level of the report',
        enum: ['error', 'warning', 'info'],
        example: 'error',
    })
    @IsEnum(['error', 'warning', 'info'])
    @IsNotEmpty()
    level: 'error' | 'warning' | 'info';

    @ApiProperty({
        description: 'Target of the report',
        enum: ['all', 'shop', 'user'],
        example: 'shop',
    })
    @IsEnum(['all', 'shop', 'user'])
    @IsNotEmpty()
    target: 'all' | 'shop' | 'user';

    @ApiProperty({
        description: 'ID of the target (shop ID or user ID)',
        example: '123',
        required: false,
    })
    @IsOptional()
    @IsString()
    targetId?: string;

    @ApiProperty({
        description: 'ID of the user reporting the issue',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;
}

export class CreateReportDto extends ReportDto { }

export class HandleReportDto {
    @ApiProperty({
        description: 'Action to take on the report',
        enum: ['resolved', 'rejected'],
        example: 'resolved',
    })
    @IsEnum(['resolved', 'rejected'])
    @IsNotEmpty()
    action: 'resolved' | 'rejected';

    @ApiProperty({
        description: 'Admin note about the resolution',
        example: 'Issue has been fixed in the latest update',
    })
    @IsString()
    @IsNotEmpty()
    note: string;
}