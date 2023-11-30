/* eslint-disable @nx/enforce-module-boundaries */
import axios from 'axios';
import { ApplicationIdentity } from '../models/application-identity.model';
import { APP_VALIDATE_ENDPOINT } from '@telly/auth';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
    AuthenticationException,
    ForbiddenException,
    BadRequestException,
    InternalServerErrorException,
} from '@telly/shared';
import {
    ERROR_CODE_TOKEN_EXPIRED_OR_INVALID,
    ERROR_CODE_ACCESS_FORBIDDEN,
    ERROR_CODE_INVALID_TOKEN_FORMAT,
    ERROR_CODE_UNKNOWN_ERROR,
    ERROR_CODE_VALIDATION_FAILED,
    ERROR_MESSAGE_TOKEN_EXPIRED_OR_INVALID,
    ERROR_MESSAGE_ACCESS_FORBIDDEN,
    ERROR_MESSAGE_INVALID_TOKEN_FORMAT,
    ERROR_MESSAGE_UNKNOWN_ERROR,
    ERROR_MESSAGE_VALIDATION_FAILED,
    ERROR_TYPE_AUTH,
} from '../constants/auth.constants';

@Injectable()
export class ApplicationClient {
    private readonly url: string;
    private readonly clientId: string;
    private readonly VALIDATION_ENDPOINT = APP_VALIDATE_ENDPOINT;
    private publicKey: string;

    /**
     * Constructor for the ApplicationClient service.
     */
    constructor(
        @Inject('HEIMDALL_URL') url: string,
        @Inject('HEIMDALL_CLIENT_ID') clientId: string,
        private readonly configService: ConfigService,
        @Inject(CACHE_MANAGER) private cacheManager: any,
    ) {
        this.url = url;
        this.clientId = clientId;
    }

    /**
     * Validates the provided token by either checking the cache or contacting the authorization server.
     * @param token - The token to be validated.
     * @param scope - The scope for which the token is being validated.
     * @returns A promise that resolves to the ApplicationIdentity.
     */

    onModuleInit() {
        const base64EncodedKey = this.configService.get<string>('HEIMDALL_PUBLIC_KEY');
        this.publicKey = Buffer.from(base64EncodedKey, 'base64').toString('utf8');
    }

    async validateToken(token: string, scope: string): Promise<ApplicationIdentity> {
        /** Check the cache for the validation result */
        const cacheKey = this.createCacheKey(token);
        // Hask token
        const cachedResponse: Response | undefined = await this.cacheManager.get(cacheKey);

        if (cachedResponse) {
            const cachedValidation: ApplicationIdentity = await cachedResponse.json();
            console.log('Retrieved from cache:', cachedValidation);
            return cachedValidation;
        }

        /** If not in cache, contact the authorization server */
        try {
            const response = await this.requestTokenValidation(token, scope);
            const identity = new ApplicationIdentity(response.data, this.publicKey, [scope]);

            /** Save the validation result in the cache */
            const cacheResponse = new Response(JSON.stringify(identity));
            await this.cacheManager.set(cacheKey, cacheResponse);

            return identity;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Sends a request to the validation endpoint to validate the token.
     * @param token - The token to be validated.
     * @param scope - The scope for which the token is being validated.
     * @returns A promise that resolves to the server's response.
     */
    private async requestTokenValidation(token: string, scope: string) {
        const validationUrl = `${this.url}${this.VALIDATION_ENDPOINT}`;
        return axios.post(
            validationUrl,
            { scope },
            {
                headers: {
                    Accept: 'application/json',
                    'Client-ID': this.clientId,
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    }

    /**
     * Handles errors that occur during token validation.
     * @param error - The error thrown during validation.
     */
    private handleError(error: any): void {
        console.warn('Error validating application token:', error.response?.status);
        console.error('Additional error context:', {
            endpoint: APP_VALIDATE_ENDPOINT,
            clientId: this.clientId,
        });
        console.log('Full error:', error);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    throw new AuthenticationException(
                        ERROR_MESSAGE_TOKEN_EXPIRED_OR_INVALID,
                        ERROR_TYPE_AUTH,
                        ERROR_CODE_TOKEN_EXPIRED_OR_INVALID,
                    );
                case 403:
                    throw new ForbiddenException(
                        ERROR_MESSAGE_ACCESS_FORBIDDEN,
                        ERROR_TYPE_AUTH,
                        ERROR_CODE_ACCESS_FORBIDDEN,
                    );
                case 422:
                    throw new BadRequestException(
                        ERROR_MESSAGE_INVALID_TOKEN_FORMAT,
                        ERROR_TYPE_AUTH,
                        ERROR_CODE_INVALID_TOKEN_FORMAT,
                    );
                default:
                    throw new InternalServerErrorException(
                        ERROR_MESSAGE_UNKNOWN_ERROR,
                        ERROR_TYPE_AUTH,
                        ERROR_CODE_UNKNOWN_ERROR,
                    );
            }
        } else {
            console.error('Additional error context:', {
                endpoint: APP_VALIDATE_ENDPOINT,
                clientId: this.clientId,
            });
            console.log('Full error:', error);
            throw new InternalServerErrorException(
                ERROR_MESSAGE_VALIDATION_FAILED,
                ERROR_TYPE_AUTH,
                ERROR_CODE_VALIDATION_FAILED,
            );
        }
    }

    /**
     * Creates a cache key based on the provided token.
     * @param token - The token for which the cache key is being created.
     * @returns The cache key as a string.
     */
    private createCacheKey(token: string): string {
        return `validateToken_${token}`;
    }
}
