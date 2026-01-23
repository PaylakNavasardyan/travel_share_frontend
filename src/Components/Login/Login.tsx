import React, { useState } from 'react'
import classes from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import AuthService from '../../services/AuthService';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

export default function Login() {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [apiError, setApiError] = useState<string | null>(null);

    const navigate = useNavigate();

    const { setUser } = useUser();

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const form = e.currentTarget.form;
            const index = Array.prototype.indexOf.call(form, e.currentTarget);
            const nextInput = form?.elements[index + 1] as HTMLElement;
            nextInput?.focus();
        }
    };
    
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            let response = await AuthService.login({login, password});

            setUser({
                userName: response.data.data.user.username,
                email: response.data.data.user.email,
                name: response.data.data.user.name,
                surname: response.data.data.user.surname
            });
    
            navigate("/travel-share")
        }catch(error: unknown) {
            if (axios.isAxiosError(error)) { 
                setApiError(error.response?.data.data.reason || 'Something went wrong');
                return;
            } 
        }

        navigate('/travel-share');
    };
    
    return (
    <div className={classes.login}>
        <div className={classes.loginBody}>
            <div className={classes.loginTitle}>
                <p>LOGIN</p>
            </div>
            {apiError && <p className={classes.apiErrorMessage}>{apiError}</p>}
            <form className={classes.form}>
                <div className={classes.inputDiv}>
                    <input 
                        className={classes.loginFields}
                        type='text'
                        placeholder='Username or Email'
                        name='username or email'
                        value={login}
                        onKeyDown={handleKeydown}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>

                <div className={classes.inputDiv}>
                    <input 
                        className={classes.loginFields}
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className={classes.loginButton}>
                    <button
                        type='button'
                        onClick={handleClick}
                    >Login
                    </button>
                </div>
            </form>

            <div className={classes.loginGuide}>
                <span>Maybe you <Link className={classes.linkToForgot} to={'/forgot-password'}>Forgot</Link> your password?</span>
            </div>
        </div>
    </div>
  )
}
