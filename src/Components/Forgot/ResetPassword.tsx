import React, { useState } from 'react'
import classes from './ResetPassword.module.css'
import { TbLockPassword } from "react-icons/tb";
import { keyboard } from '@testing-library/user-event/dist/keyboard';

export default function ResetPassword() {
    const LockPassword = TbLockPassword as unknown as React.FC<{color?: string, size?: string}>;

    const [password, setPassword] = useState<string>('');
    const [confirmPass, setComfirmPass] = useState<string>('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === 'Enter') {
        e.preventDefault();
        const form = e.currentTarget.form;
        const index = Array.prototype.indexOf.call(form, e.currentTarget);
        const nextInput = form?.[index + 1] as HTMLElement;
        nextInput?.focus()
      }
    };
    
  return (
    <div className={classes.reset}>
        <div className={classes.resetBody}>
            <div className={classes.resetTitle}>
              <LockPassword color='#FF5A5FFF' size='80'/>
              <p>FORGOT PASSWORD</p>
            </div>

            <form>
              <div className={classes.inputDiv}>
                <input 
                  className={classes.resetFields}
                  type='password'
                  name='password'
                  value={password}
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  required
                />
              </div>

              <div className={classes.inputDiv}>
                  <input 
                    className={classes.resetFields}
                    type='password'
                    name='confirmPass'
                    value={confirmPass}
                    placeholder='Confirm Password'
                    onChange={(e) => setComfirmPass(e.target.value)}
                    required
                  />
              </div>

               <div className={classes.resetButton}>
                  <button type="button">
                    Reset Password
                  </button>
                </div>
            </form>
        </div>
    </div>
  )
}
