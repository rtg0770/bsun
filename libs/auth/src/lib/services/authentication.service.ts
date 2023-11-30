import { Injectable } from '@nestjs/common';
import { IIdentity } from '../interfaces/iidentity.interface';
import { ConfigService } from '@nestjs/config';
import { ApplicationClient } from '../utils/application.client';
import { UserClient } from '../utils/user.client';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly configService: ConfigService,
        private readonly userClient: UserClient,
        private readonly appClient: ApplicationClient,
    ) {}

    async validateUserToken(accessToken: string, scope: string): Promise<IIdentity> {
        return this.userClient.validateToken(accessToken, scope);
    }

    async validateAppToken(token: string, scope: string): Promise<IIdentity> {
        return this.appClient.validateToken(token, scope);
    }

    getClientId(): string {
        return process.env.HEIMDALL_CLIENT_ID;
    }
}
