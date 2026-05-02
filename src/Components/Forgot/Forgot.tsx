import React, { useState } from 'react'
import classes from './Forgot.module.css'
import { BsExclamationCircle } from "react-icons/bs";
import { GoChevronRight as GoChevronRightIcon, GoChevronLeft as GoChevronLeftIcon } from "react-icons/go";
import { Link } from 'react-router-dom';
import $api from '../../http';

export default function Forgot() {
    const ExclamationCircle = BsExclamationCircle as unknown as React.FC<{ className: string }>
    const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ className: string }>;
    const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ className: string }>;

    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');

    const validEmail = (email: string): string => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return 'Please enter a valid email address';
        }
        return '';
    };

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const approvedEmailError = validEmail(email);
            
            const res = await $api.post('/api/user/forgot-password/', { email });
            const message: string = res.data.data.message ?? "Please check your email";
            if (approvedEmailError) {
                setEmailError(validEmail);
                return;
            } else {
                setEmailError(message);
                setEmail('');
            };
        } catch(error) {
            console.log(error);
        }
    };

  return (
    <div className={classes.forgot}>
      <div className={classes.forgotBody}>
        <div className={classes.forgotTitle}>
            <ExclamationCircle className={classes.circleIcon}/>
            <p>FORGOT PASSWORD</p>
        </div>

        <form>
            <div className={classes.inputDiv}>
                {emailError &&<p className={classes.errorMessage}>{emailError}</p>}
                <input 
                    className={classes.forgotFields}
                    type='email'
                    name='email'
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div className={classes.forgotFirstButton}>
                <button type="button" onClick={handleClick}>
                    Next
                    <GoChevronRight className={classes.goRight} />
                </button>
            </div>
        </form>

            <Link className={classes.linkToLogin} to={'/user-login'}> 
                <div className={classes.forgotGuide}>
                    <GoChevronLeft className={classes.goLeft} />
                    <span>Back to Login</span>
                </div>
            </Link>
      </div>
    </div>
  )
}
