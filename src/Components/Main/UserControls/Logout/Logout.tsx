import React, { useEffect } from 'react';
import classes from './Logout.module.css';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../../../services/AuthService';
import axios from 'axios';

export default function Logout() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, []);

    const navigate = useNavigate();

    const userLogout = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
        e.preventDefault();

        try {
            let response = await AuthService.logout();

            localStorage.removeItem('token');
        } catch (error: unknown) {}

        navigate("/")
    };

  return (
    <div className={classes.logoutModal}>
        <div className={classes.logoutBody}>
            <p className={classes.logoutText}>Are you sure you want to log out?</p>

            <div className={classes.buttons}>
                <button 
                    className={`${classes.button} ${classes.cancelButton}`}
                    onClick={() => navigate(-1)}    
                >Cancel</button>

                <button 
                    className={`${classes.button} ${classes.logoutButton}`}
                    onClick={userLogout}
                >Logout</button>
            </div>
        </div>
    </div>
  )
}
