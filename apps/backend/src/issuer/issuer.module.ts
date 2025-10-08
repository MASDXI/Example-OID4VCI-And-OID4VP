import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { IssuerController } from './issuer.controller';
import { IssuerService } from './issuer.service';
import { ConfigModule } from '@nestjs/config';
import { customRouterIssuer } from '../agent/customRoute';

@Module({
    controllers: [IssuerController],
    providers: [IssuerService],
    imports: [ConfigModule],
})
export class IssuerModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(customRouterIssuer).forRoutes('issuer/oid4vci');
    }
}
