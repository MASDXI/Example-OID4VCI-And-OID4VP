import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CreateExamRegisterDto, UpdateExamRegisterStatusDto } from './exam.dto';
import { ExamRegisterService } from './exam.service';

@Controller('exam-register')
export class ExamRegisterController {
    constructor(private readonly examRegisterService: ExamRegisterService) {}

    @Post()
    async createRegistration(
        @Body() dto: CreateExamRegisterDto,
        @Query('holderId') holderId?: string
    ) {
        return this.examRegisterService.createRegistration(dto, holderId);
    }

    @Get()
    async getAllRegistrations(
        @Query('status') status?: string,
        @Query('email') email?: string,
        @Query('city') city?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string
    ) {
        return this.examRegisterService.getAllRegistrations({
            status,
            email,
            city,
            page: page ? parseInt(page) : undefined,
            limit: limit ? parseInt(limit) : undefined
        });
    }

    @Get('code/:registrationCode')
    async getByCode(@Param('registrationCode') registrationCode: string) {
        return this.examRegisterService.getRegistrationByCode(registrationCode);
    }

    @Get('idcard/:idCardNumber')
    async getByIdCard(@Param('idCardNumber') idCardNumber: string) {
        return this.examRegisterService.getRegistrationByIdCard(idCardNumber);
    }

    @Get('holder/:holderId')
    async getByHolder(@Param('holderId') holderId: string) {
        return this.examRegisterService.getRegistrationsByHolder(holderId);
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.examRegisterService.getRegistrationById(id);
    }

    @Put(':id/status')
    async updateStatus(
        @Param('id') id: string,
        @Body() dto: UpdateExamRegisterStatusDto
    ) {
        return this.examRegisterService.updateRegistrationStatus(id, dto);
    }

    @Put(':id/verify-credential')
    async verifyCredential(@Param('id') id: string) {
        return this.examRegisterService.verifyCredential(id);
    }

    @Delete(':id')
    async deleteRegistration(@Param('id') id: string) {
        return this.examRegisterService.deleteRegistration(id);
    }
}