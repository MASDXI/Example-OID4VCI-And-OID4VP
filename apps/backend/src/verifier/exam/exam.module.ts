import { Module } from '@nestjs/common';
import { ExamRegisterController } from './exam.controller';
import { ExamRegisterService } from './exam.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
    controllers: [ExamRegisterController],
    providers: [ExamRegisterService, PrismaService],
    exports: [ExamRegisterService]
})
export class ExamRegisterModule {}