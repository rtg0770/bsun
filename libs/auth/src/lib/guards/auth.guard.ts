/* eslint-disable @nx/enforce-module-boundaries */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { IIdentity } from '../interfaces/iidentity.interface';
import * as jwt from 'jsonwebtoken';
import { IToken } from '../interfaces/itoken.interface';
import { AuthenticationException, ForbiddenException, UnprocessableEntityException } from '@telly/shared';
import { TOKEN_TYPE_USER, TOKEN_TYPE_APPLICATION } from '../constants/auth.constants';
import {
    ERROR_CODE_INVALID_TOKEN_FORMAT,
    ERROR_CODE_UNKNOWN_TOKEN_TYPE,
    ERROR_MESSAGE_INVALID_TOKEN_FORMAT,
    ERROR_MESSAGE_UNKNOWN_TOKEN_TYPE,
} from '../constants/auth.constants';
import {
    ERROR_CODE_INVALID_AUTH_FORMAT,
    ERROR_CODE_MISSING_AUTH_HEADER,
    ERROR_CODE_NO_REQUIRED_PERMISSION_SPECIFIED,
    ERROR_CODE_NO_REQUIRED_PERMISSIONS,
    ERROR_MESSAGE_INVALID_AUTH_FORMAT,
    ERROR_MESSAGE_MISSING_AUTH_HEADER,
    ERROR_MESSAGE_NO_REQUIRED_PERMISSION_SPECIFIED,
    ERROR_MESSAGE_NO_REQUIRED_PERMISSIONS,
    ERROR_TYPE_AUTH,
} from '../constants/auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthenticationService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        const decodedToken: IToken = jwt.decode(token);
        let identity: IIdentity;

        if (!decodedToken || !decodedToken.type) {
            throw new UnprocessableEntityException(
                ERROR_MESSAGE_INVALID_TOKEN_FORMAT,
                ERROR_TYPE_AUTH,
                ERROR_CODE_INVALID_TOKEN_FORMAT,
            );
        }

        if (decodedToken.type === TOKEN_TYPE_USER) {
            identity = await this.authService.validateUserToken(token, 'cred');
        } else if (decodedToken.type === TOKEN_TYPE_APPLICATION) {
            identity = await this.authService.validateAppToken(token, 'cred');
        } else {
            throw new UnprocessableEntityException(
                ERROR_MESSAGE_UNKNOWN_TOKEN_TYPE,
                ERROR_TYPE_AUTH,
                ERROR_CODE_UNKNOWN_TOKEN_TYPE,
            );
        }

        // Attach the user identity or userId to the request
        request.userId = identity.id;

        const requiredPermission = this.reflectMetadata('requiredPermission', context.getHandler());
        if (!requiredPermission) {
            throw new AuthenticationException(
                ERROR_MESSAGE_NO_REQUIRED_PERMISSION_SPECIFIED,
                ERROR_TYPE_AUTH,
                ERROR_CODE_NO_REQUIRED_PERMISSION_SPECIFIED,
            );
        }

        if (!this.hasRequiredPermission(identity, requiredPermission)) {
            throw new ForbiddenException(
                ERROR_MESSAGE_NO_REQUIRED_PERMISSIONS,
                ERROR_TYPE_AUTH,
                ERROR_CODE_NO_REQUIRED_PERMISSIONS,
            );
        }

        return true;
    }

    private reflectMetadata(key: string, target: any): any {
        return Reflect.getMetadata(key, target);
    }

    private extractTokenFromRequest(request): string {
        const authorization = request.headers.authorization;

        if (!authorization) {
            throw new AuthenticationException(
                ERROR_MESSAGE_MISSING_AUTH_HEADER,
                ERROR_TYPE_AUTH,
                ERROR_CODE_MISSING_AUTH_HEADER,
            );
        }

        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw new AuthenticationException(
                ERROR_MESSAGE_INVALID_AUTH_FORMAT,
                ERROR_TYPE_AUTH,
                ERROR_CODE_INVALID_AUTH_FORMAT,
            );
        }

        return token;
    }

    private hasRequiredPermission(identity: IIdentity, requiredPermission: string): boolean {
        return identity.scopes?.cred?.acl?.includes(requiredPermission);
    }
}
