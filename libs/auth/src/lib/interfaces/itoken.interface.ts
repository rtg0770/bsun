export interface IToken {
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    nbf: number;
    prv: string;
    'Client-ID': string;
    scopes: [];
    sub: string;
    type: string;
}
