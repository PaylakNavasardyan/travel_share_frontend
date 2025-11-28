import React, { useState } from 'react'
import classes from './Forgot.module.css'
import { BsExclamationCircle } from "react-icons/bs";
import { GoChevronRight as GoChevronRightIcon, GoChevronLeft as GoChevronLeftIcon } from "react-icons/go";
import { Link } from 'react-router-dom';

export default function Forgot() {
    const ExclamationCircle = BsExclamationCircle as unknown as React.FC<{color?: string, size?: number}>
    const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ size?: number }>;
    const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ size?: number }>;

    const [email, setEmail] = useState<string>('');

  return (
    <div className={classes.forgot}>
      <div className={classes.forgotBody}>
        <div className={classes.forgotTitle}>
            <ExclamationCircle color='#4848A0FF' size={60}/>
            <p>FORGOT PASSWORD</p>
        </div>

        <form>
            <div className={classes.inputDiv}>
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
                <button type="submit">
                    Next
                    <GoChevronRight size={40} />
                </button>
            </div>
        </form>

            <Link className={classes.linkToLogin} to={'/user-login'}> 
                <div className={classes.forgotGuide}>
                    <GoChevronLeft size={20} />
                    <span>Back to Login</span>
                </div>
            </Link>
      </div>
    </div>
  )
}
