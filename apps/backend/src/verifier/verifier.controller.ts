import {
    Body,
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { VerifierService } from './verifier.service';

@Controller('verifier')
export class VerifierController {
    constructor(private readonly verifierService: VerifierService) {}

    @Post('login')
    async login(@Body() body, @Res() res) {
        const { idCardNumber, password } = body;

        try {
            const user = await this.verifierService.validateUser(idCardNumber, password);
            return res.status(HttpStatus.OK).json({ ...user });
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'UnauthorizedException' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

    @Post('request-proof')
    async requestProof(@Body() body, @Res() res) {
        try {
            const proofRequest = await this.verifierService.createProofRequest('UniversityDegreeCredential');
            return res.status(HttpStatus.OK).json({ proofRequest });
        } catch (error) {}
    }

    @Get('user/:id')
    async getUser(@Param('id') id: string, @Res() res) {
        try {
            const user = await this.verifierService.getUserById(id);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'NotFoundException' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }
}
