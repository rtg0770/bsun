export interface IIdentity {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    expiresIn: number;
    alias: string | null;
    groups: string[];
    scopes: {
        [key: string]: {
            acl: string[];
        };
    };
    emailChange: string | null;
    publicKey: string;
    scope: string[];
}
