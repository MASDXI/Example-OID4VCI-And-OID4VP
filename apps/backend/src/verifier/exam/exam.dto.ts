import { IsString, IsEmail, IsDateString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateExamRegisterDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(/^[0-9+\-\s()]+$/)
    phone: string;

    @IsNotEmpty()
    @IsDateString()
    dateOfBirth: string;

    @IsNotEmpty()
    @IsString()
    nationality: string;

    @IsNotEmpty()
    @Length(13, 13)
    @Matches(/^[0-9]+$/)
    idCardNumber: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    postalCode: string;

    @IsString()
    country?: string;
}

export class UpdateExamRegisterStatusDto {
    @IsNotEmpty()
    @IsString()
    status: 'Submitted' | 'Verified' | 'Approved' | 'Rejected' | 'Completed';
}
