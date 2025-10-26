import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Res, UnauthorizedException } from '@nestjs/common';
import { HolderService } from './holder.service';
import { UserService } from './user.service';

@Controller('holder')
export class HolderController {
    constructor(
        private readonly holderService: HolderService,
        private readonly userService: UserService,
    ) {}

    @Post('login')
    async login(@Body() body, @Res() res) {
        // const { email, password } = body;

        try {
            const email = await this.userService.validateUser(body.email, body.password);
            return res.status(HttpStatus.OK).json({ email });
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'UnauthorizedException' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

    @Post('resolve-proof-request')
    async resolveProofRequest(@Body() body, @Res() res) {
        const { proofRequest } = body;
        try {
            const resolvedProofRequest = await this.holderService.resolveProofRequest(proofRequest);
            const data = await this.holderService.acceptPresentation(resolvedProofRequest);
            console.log('🚀 ~ HolderController ~ resolveProofRequest ~ x:', data.body);
            return res.status(HttpStatus.OK).json(data);
        } catch (error) {
            console.log(error);
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'NotFoundException' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

    @Post('accept-presentation')
    async acceptPresentation(@Body() Body, @Res() res) {
        const { resolvedPresentationRequest } = Body;
        try {
            const data = await this.holderService.acceptPresentation(resolvedPresentationRequest);
            return res.status(HttpStatus.OK).json(data);
        } catch (error) {
            console.log(error);
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'NotFoundException' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

    @Post('resolve-credential-offer')
    async resolveCredentialOffer(@Body() body, @Res() res) {
        const { payload, email } = body;
        try {
            const metadata = await this.holderService.resolveCredentialOffer(payload, email);
            return res.status(HttpStatus.OK).json(metadata);
        } catch (error) {
            console.log(error);
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'NotFoundException' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

    @Post('accept-credential-offer')
    async acceptCredentialOffer(@Body() body, @Res() res) {
        const { credentialOfferId, email } = body;
        try {
            const prettyClaims = await this.holderService.acceptCredentialOffer(email, credentialOfferId);
            return res.status(HttpStatus.OK).json(prettyClaims);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'NotFoundException' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

   

    @Delete('reject-credential-offer/:id/:email')
    async rejectCredentialOffer(@Param() params, @Res() res) {
        try {
            const { id, email } = params;
            await this.holderService.rejectCredential(email, id);
            return res.status(HttpStatus.OK).json();
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'NotFoundException' });
            }
        }
    }

    @Delete('delete-credential/:id/:email')
    async deleteCredential(@Param() params, @Res() res) {
        try {
            const { id, email } = params;
            await this.holderService.deleteCredential(email, id);
            return res.status(HttpStatus.OK).json();
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'NotFoundException' });
            }
        }
    }

    @Get('credential-offer/:id')
    async getCredentialsOffer(@Param() params, @Res() res) {
        try {
            const { id } = params;

            const holder = await this.holderService.getCredentialOfferByEmail(id);
            return res.status(HttpStatus.OK).json(holder);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'NotFoundException' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

    @Get('credentials/:id')
    async getCredentials(@Param() params, @Res() res) {
        try {
            const { id } = params;
            const credentials = await this.holderService.getCredentialsByEmail(id);
            return res.status(HttpStatus.OK).json(credentials);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'NotFoundExceptionss' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }

    @Get('credential/:id/:email')
    async getCredential(@Param() params, @Res() res) {
        try {
            const { id, email } = params;
            const credential = await this.holderService.getCredentialByEmail(id, email);
            return res.status(HttpStatus.OK).json(credential);
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({ message: 'NotFoundExceptionss' });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'INTERNAL_SERVER_ERROR' });
        }
    }
}
