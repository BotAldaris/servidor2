export interface Logar {
	email: string;
	password: string;
}

export interface Tokens {
	tokenType: string;
	accessToken: string;
	expiresIn: number;
	refreshToken: string;
}

export default interface Roles {
	id: string;
	nome: string;
}

export interface PostRole {
	nome: string;
}

export interface PostAddRoleToUser {
	role: string;
	email: string;
}
