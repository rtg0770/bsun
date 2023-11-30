import { IIdentity } from '../interfaces/iidentity.interface';

export class ApplicationIdentity implements IIdentity {
  public id: string;
  public name: string;
  public email: string;
  public accessToken: string;
  public expiresIn: number;
  public publicKey: string;
  public scope: string[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(data: any, publicKey: string, scopes: string[]) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.email = data.email || '';
    this.accessToken = data.access_token || '';
    this.expiresIn = data.expires_in || 0;
    this.publicKey = publicKey;
    this.scope = scopes;
  }
  alias: string;
  groups: string[];
  scopes: { [key: string]: { acl: string[] } };
  emailChange: string;
}
