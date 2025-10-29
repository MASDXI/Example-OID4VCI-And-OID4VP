import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { presentationDefinitions, Verifier } from 'src/agent/verifier';
import * as mockUser from './mocks/mock-data-issuer.json';

@Injectable()
export class VerifierService {
    constructor(private configService: ConfigService) {}

    private verifier: Verifier;

    async onModuleInit() {
        const PORT = this.configService.get<number>('port');
        this.verifier = await Verifier.build(PORT);
        console.info('Verifier Build Success');
    }

    async createProofRequest(id: string) {
        const presentationDefinition = presentationDefinitions.find((p) => p.id === id);

        return this.verifier.createProofRequest(presentationDefinition);
    }

    async validateUser(idCardNumber: number, password: string) {
        if (Number(mockUser.idcardnumber) === idCardNumber && mockUser.password === password) {
            return mockUser;
        } else {
            throw new UnauthorizedException('Invalid email or password');
        }
    }

    async getUserById(id: string) {
        if (mockUser.id === id) {
            return mockUser;
        } else {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
