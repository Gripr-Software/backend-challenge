export interface Jwt {
  iss: string;
  sub: string;
  aud: any[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}
