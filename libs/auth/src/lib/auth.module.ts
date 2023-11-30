import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationService } from './services/authentication.service';
import { UserClient } from './utils/user.client';
import { ApplicationClient } from './utils/application.client';
import { AuthGuard } from './guards/auth.guard';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_VALIDATE_ENDPOINT, USER_VALIDATE_ENDPOINT } from './constants/auth.constants';

@Module({
    imports: [
        CacheModule.register({
            store: 'memory',
            ttl: 3600,
            max: 100,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
    ],
    providers: [
        UserClient,
        ApplicationClient,
        AuthGuard,
        AuthenticationService,
        {
            provide: 'USER_VALIDATE_ENDPOINT',
            useValue: USER_VALIDATE_ENDPOINT,
        },
        {
            provide: 'APP_VALIDATE_ENDPOINT',
            useValue: APP_VALIDATE_ENDPOINT,
        },
        {
            provide: 'HEIMDALL_CLIENT_ID',
            useValue: process.env.HEIMDALL_CLIENT_ID,
        },
        {
            provide: 'HEIMDALL_URL',
            useValue: process.env.HEIMDALL_URL,
        },
    ],
    exports: [AuthGuard, AuthenticationService],
})
export class AuthModule {}
