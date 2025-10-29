import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateExamRegisterDto, UpdateExamRegisterStatusDto } from './exam.dto';

@Injectable()
export class ExamRegisterService {
    constructor(private prisma: PrismaService) {}

    // Generate unique registration code
    private generateRegistrationCode(): string {
        const prefix = 'TRG'; // tourism guide
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${prefix}-${timestamp}-${random}`;
    }

    // Create new exam registration
    async createRegistration(dto: CreateExamRegisterDto, holderId?: string) {
        // Check if ID card number already exists
        const existingRegistration = await this.prisma.examRegister.findUnique({
            where: { idCardNumber: dto.idCardNumber }
        });

        if (existingRegistration) {
            throw new ConflictException('ID card number already registered');
        }

        // Generate registration code
        const registrationCode = this.generateRegistrationCode();

        // Create registration
        const registration = await this.prisma.examRegister.create({
            data: {
                ...dto,
                registrationCode,
                dateOfBirth: new Date(dto.dateOfBirth),
                country: dto.country || 'Thailand',
                holderId: holderId || null,
            },
            include: {
                holder: true
            }
        });

        return {
            success: true,
            message: 'Registration created successfully',
            data: registration
        };
    }

    // Get registration by ID
    async getRegistrationById(id: string) {
        const registration = await this.prisma.examRegister.findUnique({
            where: { id },
            include: {
                holder: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            }
        });

        if (!registration) {
            throw new NotFoundException(`Registration with ID ${id} not found`);
        }

        return registration;
    }

    // Get registration by registration code
    async getRegistrationByCode(registrationCode: string) {
        const registration = await this.prisma.examRegister.findUnique({
            where: { registrationCode },
            include: {
                holder: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            }
        });

        if (!registration) {
            throw new NotFoundException(`Registration with code ${registrationCode} not found`);
        }

        return registration;
    }

    // Get registration by ID card number
    async getRegistrationByIdCard(idCardNumber: string) {
        const registration = await this.prisma.examRegister.findUnique({
            where: { idCardNumber },
            include: {
                holder: true
            }
        });

        if (!registration) {
            throw new NotFoundException(`Registration with ID card ${idCardNumber} not found`);
        }

        return registration;
    }

    // Get all registrations with filters
    async getAllRegistrations(filters?: {
        status?: string;
        email?: string;
        city?: string;
        page?: number;
        limit?: number;
    }) {
        const page = filters?.page || 1;
        const limit = filters?.limit || 10;
        const skip = (page - 1) * limit;

        const where: any = {};
        if (filters?.status) where.status = filters.status;
        if (filters?.email) where.email = { contains: filters.email };
        if (filters?.city) where.city = filters.city;

        const [registrations, total] = await Promise.all([
            this.prisma.examRegister.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    holder: {
                        select: {
                            id: true,
                            email: true
                        }
                    }
                }
            }),
            this.prisma.examRegister.count({ where })
        ]);

        return {
            data: registrations,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    // Update registration status
    async updateRegistrationStatus(id: string, dto: UpdateExamRegisterStatusDto) {
        const registration = await this.prisma.examRegister.findUnique({
            where: { id }
        });

        if (!registration) {
            throw new NotFoundException(`Registration with ID ${id} not found`);
        }

        // Validate status transition
        const validTransitions: Record<string, string[]> = {
            'Submitted': ['Verified', 'Rejected'],
            'Verified': ['Approved', 'Rejected'],
            'Approved': ['Completed'],
            'Rejected': [],
            'Completed': []
        };

        if (!validTransitions[registration.status].includes(dto.status)) {
            throw new BadRequestException(
                `Invalid status transition from ${registration.status} to ${dto.status}`
            );
        }

        const updated = await this.prisma.examRegister.update({
            where: { id },
            data: { status: dto.status },
            include: {
                holder: true
            }
        });

        return {
            success: true,
            message: 'Status updated successfully',
            data: updated
        };
    }

    // Verify credential
    async verifyCredential(id: string) {
        const registration = await this.prisma.examRegister.findUnique({
            where: { id }
        });

        if (!registration) {
            throw new NotFoundException(`Registration with ID ${id} not found`);
        }

        const updated = await this.prisma.examRegister.update({
            where: { id },
            data: { verifiableCredentialVerified: true },
            include: {
                holder: true
            }
        });

        return {
            success: true,
            message: 'Credential verified successfully',
            data: updated
        };
    }

    // Get registrations by holder
    async getRegistrationsByHolder(holderId: string) {
        const registrations = await this.prisma.examRegister.findMany({
            where: { holderId },
            orderBy: { createdAt: 'desc' }
        });

        return registrations;
    }

    // Delete registration
    async deleteRegistration(id: string) {
        const registration = await this.prisma.examRegister.findUnique({
            where: { id }
        });

        if (!registration) {
            throw new NotFoundException(`Registration with ID ${id} not found`);
        }

        await this.prisma.examRegister.delete({
            where: { id }
        });

        return {
            success: true,
            message: 'Registration deleted successfully'
        };
    }
}