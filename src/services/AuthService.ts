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

type LoginBody = {
    login: string;
    password: string
}

type EditBody = {
    email?: string,
    userName?: string,
    name?: string,
    surname?: string,
    password?: string,
    newPass?: string, 
    confirmNewPass?: string
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
    };

    static async login(body: LoginBody): Promise<AxiosResponse<ApiResponse<Auth.Session>>> {
        return $api.post('/api/user/login', {
            login: body.login,
            password: body.password
        });
    }; 

    static async forgot(email: string): Promise<AxiosResponse<ApiResponse<Auth.ForgotPassword>>> {
        return $api.post('/api/user/forgot', {email})
    };

    static async edit(body: EditBody): Promise<AxiosResponse<ApiResponse<Auth.Session>>> {
        return $api.patch('/api/user/update', {
            email: body.email,
            username: body.userName,
            name: body.name,
            surname: body.surname,
            currentPassword: body.password,
            newPassword: body.newPass,
            confirmPassword: body.confirmNewPass
        });
    }
}