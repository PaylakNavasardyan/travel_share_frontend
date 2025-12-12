import React, { useState } from 'react'
import classes from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [nameORemail, setNameORemail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [noremError, setNoremError] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string>('');

    const navigate = useNavigate();

    const validPassword = (password: string): string => {
        const startsWithLetterRegex = /^[a-zA-Z]/;
        const passCharactersRegex = /^[a-zA-Z0-9_.-]+$/;
        let passFirstChar = password.charAt(0).toLowerCase();
        let passChars = '';
        
        if (!startsWithLetterRegex.test(password)) {
        return 'Password must start with Latin letter';
        } else if (!passCharactersRegex.test(password)) {
        return 'Password can contain only Latin letters numbers and (-, _, .)';
        } else if (password.length < 6) {
        return 'Password cannot contain fewer than 6 characters';
        } else if (password.length > 15) {
        return 'Password cannot contain more than 15 characters';
        }

        for (let i = 0; i < password.length; i++) {
        if (password[i].toLowerCase() === passFirstChar) {
            passChars += password[i];
        }
    
        if (passChars.length === password.length) {
            return 'Password cannot contain only identical characters';
        }
        }
        return '';
    };
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmail = (value: string): string => {
        const v = (value ?? '').trim();

        if (!emailRegex.test(v)) return 'Please enter a valid email address';
        return '';
    };

    const validUserName = (value: string): string => {
        const v = (value ?? '').trim();

        const startsWithLetter = /^[a-zA-Z]/;
        const lettersAndNumbersOnly = /^[a-zA-Z0-9]+$/;

        if (!startsWithLetter.test(v)) return 'Username must start with Latin letter';
        if (!lettersAndNumbersOnly.test(v)) return 'Username can contain only Latin letters and numbers';
        if (v.length < 6) return 'Username must be at least 6 characters';
        if (v.length > 15) return 'Username cannot exceed 15 characters';
        
        const first = v[0].toLowerCase();
        if (v.split('').every(ch => ch.toLowerCase() === first)) return 'Username cannot contain only identical characters';
        
        return '';
    };
    
    const isLoginOrUsername = (value: string): { type: 'email' | 'username', error: string } => {
        const v = (value ?? '').trim();

        if (v.includes('@')) {
            return { type: 'email', error: validEmail(v) };
        } 
        
        return { type: 'username', error: validUserName(v) };
            
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { error } = isLoginOrUsername(nameORemail)
        const passErr = validPassword(password);
        
        setNoremError(error);
        setPasswordError(passErr);    

        if (error || passErr) return;

        navigate('/travel-share');
    };
    
    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const form = e.currentTarget.form;
            const index = Array.prototype.indexOf.call(form, e.currentTarget);
            const nextInput = form?.elements[index + 1] as HTMLElement;
            nextInput?.focus();
        }
    };
    
    return (
    <div className={classes.login}>
        <div className={classes.loginBody}>
            <div className={classes.loginTitle}>
                <p>LOGIN</p>
            </div>
            <form className={classes.form}>
                <div className={classes.inputDiv}>
                    {noremError && <p className={classes.errorMessage}>{noremError}</p>}
                    <input 
                        className={classes.loginFields}
                        type='text'
                        placeholder='Username or Email'
                        name='username or email'
                        value={nameORemail}
                        onKeyDown={handleKeydown}
                        onChange={(e) => setNameORemail(e.target.value)}
                        required
                    />
                </div>

                <div className={classes.inputDiv}>
                    {passwordError && <p className={classes.errorMessage}>{passwordError}</p>}
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
