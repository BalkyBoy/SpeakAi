export class AuthResponse {
    message?: string;
    accessToken: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        isEmailVerified?: boolean;
        password: string;
        nativeLanguage: string;
        learningLanguage: string;
        createdAt?: Date;
    }
}