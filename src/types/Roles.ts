export interface Logar {
	email: string;
	password: string;
}

export interface Tokens{
	
  tokenType: string,
  accessToken: string,
  expiresIn: number,
  refreshToken: string

}