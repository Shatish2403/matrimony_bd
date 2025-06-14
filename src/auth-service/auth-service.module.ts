import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';

@Module({
    controllers:[AuthServiceController],
    providers:[AuthServiceService]
})
export class AuthServiceModule {}
