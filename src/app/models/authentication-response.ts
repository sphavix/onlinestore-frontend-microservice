export interface AuthenticationResponse {
    userId: string;
    fullName: string;
    email: string;
    gender: string;
    token: string;
    success: boolean;
}