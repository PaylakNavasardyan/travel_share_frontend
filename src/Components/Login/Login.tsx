import React from 'react'
import classes from './Login.module.css'
import { Link } from 'react-router-dom'

export default function Login() {

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
                    />
                </div>

                <div className={classes.inputDiv}>
                    <input 
                        className={classes.loginFields}
                        type='password'
                        placeholder='Password'
                        name='password'
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
