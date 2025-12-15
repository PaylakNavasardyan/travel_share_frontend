import React, { useState } from 'react'
import classes from './ResetPassword.module.css'
import { TbLockPassword } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const LockPassword = TbLockPassword as unknown as React.FC<{color?: string, size?: string}>;

  const [password, setPassword] = useState<string>('');
  const [confirmPass, setComfirmPass] = useState<string>('');

  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPassError, setConfirmPassError] = useState<string>('');

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

  const validConfirmPass = (confirmPass: string): string => {
    if (confirmPass !== password) {
      return 'Repeat Password does not match with Password';
    }
    return '';
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const approvedPasswordError = validPassword(password);
    const approvedConfirmPassError = validConfirmPass(confirmPass);

    setPasswordError(approvedPasswordError);
    setConfirmPassError(approvedConfirmPassError);

    if (approvedPasswordError || approvedConfirmPassError) return;
    
    navigate('/travel-share');
  }

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
                {passwordError && <p className={classes.errorMessage}>{passwordError}</p>}
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
                {confirmPassError && <p className={classes.errorMessage}>{confirmPassError}</p>}
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
                  <button type="button" onClick={handleClick}>
                    Reset Password
                  </button>
                </div>
            </form>
        </div>
    </div>
  )
}
