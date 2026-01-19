export interface AuthUserInterface {
    id: number;
    email: string;
    // firstname: string;
    // lastname: string;
    avartarUrl?: string;
}

export interface SigninDto {
    email: string;
    password: string;
}
