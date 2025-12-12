import $api from "../http";
import { Auth, ApiResponse } from "../types";
import { AxiosResponse } from "axios";

type RegistrationBody = {
    email: string;
    userName: string;
    name?: string;
    surname?: string;
    password: string;
    confirmPass: string;
}

export default class AuthService {
    static async registration(body: RegistrationBody):Promise<AxiosResponse<ApiResponse<Auth.Session>>> {
        return $api.post('/api/user/registration', {
            email: body.email,
            username: body.userName,
            name: body.name,
            surname: body.surname,
            password: body.password,
            passwordConfirm: body.confirmPass
        });
    }

    static async login(password: string, email?: string, username?: string): Promise<AxiosResponse<ApiResponse<Auth.Session>>> {
        return $api.post('/api/user/login', {email, username, password}) 
    } 

    static async forgot(email: string): Promise<AxiosResponse<ApiResponse<Auth.ForgotPassword>>> {
        return $api.post('/apo/user/forgot-password', {email})
    }
}