import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports:[DatabaseModule],
    controllers:[AuthServiceController],
    providers:[AuthServiceService]
})
export class AuthServiceModule {}
