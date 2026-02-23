export interface AuthUserInterface {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    avatarUrl: string | null;
}

export interface SigninDto {
    email: string;
    password: string;
}
export interface SignupDto {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
}
