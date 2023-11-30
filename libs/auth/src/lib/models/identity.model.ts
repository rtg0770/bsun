import { IIdentity } from '../interfaces/iidentity.interface';

export class UserIdentity implements IIdentity {
    public id: string;
    public name: string;
    public email: string;
    public accessToken: string;
    public expiresIn: number;
    public alias: string | null;
    public groups: string[];
    public scopes: { [key: string]: { acl: string[] } };
    public emailChange: string | null;
    public publicKey: string;
    public scope: string[];

    constructor(data: any, publicKey: string, scope: string[]) {
        this.id = data.id || '';
        this.name = data.name || '';
        this.email = data.email || '';
        this.accessToken = data.access_token || '';
        this.expiresIn = data.expires_in || 0;
        this.alias = data.alias || null;
        this.groups = data.groups || [];
        this.scopes = data.scopes || {};
        this.emailChange = data.email_change || null;
        this.publicKey = publicKey;
        this.scope = scope;
    }
    // Any utility methods related to Identity can be added here
    hasScope(scopeName: string): boolean {
        return this.scope.includes(scopeName);
    }

    hasAccessToResource(resource: string): boolean {
        return this.scopes.ragnar?.acl?.includes(resource);
    }
}
