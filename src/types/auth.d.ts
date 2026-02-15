export namespace Auth {
    type User = {
        username: string;
        email: string;
        name?: string;
        surname?: string;
        isActive: boolean;
        profilePicture?: string;
        followers: number;
        following: number;
        userId: string
    };
    
    type Session = {
        user: User;
        accessToken: string;
    };

    type ForgotPassword = {
        message: string;
    };
}