import React, { useState } from 'react'
import classes from './Login.module.css'
import { Link } from 'react-router-dom'

export default function Login() {
    const [nameORemail, setNameORemail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const form = e.currentTarget.form;
            const index = Array.prototype.indexOf.call(form, e.currentTarget);
            const nextInput = form?.elements[index + 1] as HTMLElement;
            nextInput?.focus();
        }
    }

  return (
    <div className={classes.login}>
        <div className={classes.loginBody}>
            <div className={classes.loginTitle}>
                <p>LOGIN</p>
            </div>
            <form className={classes.form}>
                <div className={classes.inputDiv}>
                    <input 
                        className={classes.loginFields}
                        type='text'
                        placeholder='Username or Email'
                        name='username or email'
                        value={nameORemail}
                        onKeyDown={handleKeydown}
                        onChange={(e) => setNameORemail(e.target.value)}
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
                    />
                </div>

                <div className={classes.loginButton}>
                    <button
                        type='button'
                    >Login
                    </button>
                </div>
            </form>

            <div className={classes.loginGuide}>
                <span>Maybe you <Link className={classes.linkToForgot} to={'/Forgot'}>forgot</Link> your password?</span>
            </div>
        </div>
    </div>
  )
}
