import React, { useReducer, useState } from 'react';
import classes from './Registration.module.css';
import { GoChevronRight as GoChevronRightIcon } from "react-icons/go";
import { GoChevronLeft as GoChevronLeftIcon } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService  from '../../services/AuthService';

export default function Registration() {
  const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ size?: number }>;
  const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ size?: number }>;

  type State = {
    email: string,
    userName: string,
    password: string,
    confirmPass: string,
    name?: string,
    surname?: string
  };

  type Action = {
    name: keyof State,
    value: string
  };

  const initialState: State = {
    email: '',
    userName: '',
    password: '',
    confirmPass: '',
    name: '',
    surname: ''
  };
  
  type ErrorMessage = {
    field: string,
    message: string
  };

  type ErrorState = {
    [key: string]: string
  };

  function reducer(state: State, action: Action) {
    return { ...state, [action.name]: action.value };
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [step, setStep] = useState<number>(1);
  const [error, setError] = useState<ErrorState>({
    emailError: '',
    userNameError: '',
    passwordError: '',
    confirmPassError: '',
    nameError: '',
    surnameError: ''
  });

  const navigate = useNavigate();

  const updateError = ({ field, message }: ErrorMessage): void => {
    setError((prev: ErrorState) => ({
      ...prev,
      [field]: message
    }));
  };

  const validEmail = (state :State): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validUserName = (state: State): string => {
    const startsWithLetterRegex = /^[a-zA-Z]/;
    const lettersAndNumbersOnlyRegex = /^[a-zA-Z0-9]+$/;
    let nameFirstChar = state.userName.charAt(0).toLowerCase();
    let nameChars = '';

    if (!startsWithLetterRegex.test(state.userName)) {
      return 'Your username must start with Latin letter';
    } else if (!lettersAndNumbersOnlyRegex.test(state.userName)) {
      return 'Your name must contain only Latin letters and numbers';
    } else if (state.userName.length < 6) {
      return 'Your username cannot contain fewer than 6 characters';
    } else if (state.userName.length > 15) {
      return 'Your username cannot contain more than 15 charactes';
    }

    for (let i = 0; i < state.userName.length; i++) {
      if (state.userName[i].toLowerCase() === nameFirstChar) {
        nameChars += state.userName[i];
      }

      if (nameChars.length === state.userName.length) {
        return 'Username cannot contain only identical characters';
      }
    }
    return '';
  };

  const validPassword = (state: State): string => {
    const startsWithLetterRegex = /^[a-zA-Z]/;
    const passCharactersRegex = /^[a-zA-Z0-9_.-]+$/;
    let passFirstChar = state.password.charAt(0).toLowerCase();
    let passChars = '';
    
    if (!startsWithLetterRegex.test(state.password)) {
      return 'Password must start with Latin letter';
    } else if (!passCharactersRegex.test(state.password)) {
      return 'Password can contain only Latin letters numbers and (-, _, .)';
    } else if (state.password.length < 6) {
      return 'Password cannot contain fewer than 6 characters';
    } else if (state.password.length > 15) {
      return 'Password cannot contain more than 15 characters';
    }

    for (let i = 0; i < state.password.length; i++) {
      if (state.password[i].toLowerCase() === passFirstChar) {
        passChars += state.password[i];
      }
  
      if (passChars.length === state.password.length) {
        return 'Password cannot contain only identical characters';
      }
    }
    return '';
  };

  const validConfirmPass = (state: State): string => {
    if (state.confirmPass !== state.password) {
      return 'Repeat Password does not match with Password';
    }
    return '';
  };

  const validName = (state: State): string => {
    const name = (state.name ?? '').trim();

    if (!name) return '';
    
    const startsWithLetterRegex = /^[a-zA-Z]/;
    const lettersAndNumbersOnlyRegex = /^[a-zA-Z0-9]+$/;

    if (!startsWithLetterRegex.test(name)) {
      return 'Your name must start with Latin letter';
    }

    if (!lettersAndNumbersOnlyRegex.test(name)) {
      return 'Your name must contain only Latin letters and numbers';
    }

    if (name.length < 3) {
      return 'Your name cannot contain fewer than 3 characters';
    }

    if (name.length > 15) {
      return 'Your name cannot contain more than 15 characters';
    }

    const firstChar = name[0].toLowerCase();
    const allSame = name.split('').every(ch => ch.toLowerCase() === firstChar);
    if ( allSame) {
      return 'The Nname cannot contain only the same characters';
    }

    return '';
  };

  const validSurnaame = (state: State): string => {
    const surname = (state.surname ?? '').trim();
    
    const startsWithLetterRegex = /^[a-zA-Z]/;
    const lettersAndNumbersOnlyRegex = /^[a-zA-Z0-9]+$/;

    if (!surname) return '';

    if (!startsWithLetterRegex.test(surname)) {
      return 'Your surname must start with Latin letter';
    }

    if (!lettersAndNumbersOnlyRegex.test(surname)) {
      return 'Your surname must contain only Latin letters and numbers';
    }

    if (surname.length < 3) {
      return 'Your surname cannot contain fewer than 3 characters';
    }

    if (surname.length > 20) {
      return 'Your surname cannot contain more than 20 characters';
    }

    const firstChar = surname[0].toLowerCase();
    const allSame = surname.split('').every(ch => ch.toLowerCase() === firstChar);
    if (allSame) {
      return 'The surname cannot contain only the same characters';
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ name: e.target.name as keyof State, value: e.target.value });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.form;
      const index = Array.prototype.indexOf.call(form, e.currentTarget);
      const nextInput = form?.elements[index + 1] as HTMLElement;
      nextInput?.focus();
    }
  };
  
  const handleFirstSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const approvedEmailError = validEmail(state);
    const approvedUserNameError = validUserName(state);
    const approvedPasswordError = validPassword(state);
    const approvedConfirmPassError = validConfirmPass(state);

    updateError({
      field: 'emailError', 
      message: approvedEmailError
    });
    updateError({
      field: 'userNameError', 
      message: approvedUserNameError
    });
    updateError({
      field: 'passwordError', 
      message: approvedPasswordError
    });
    updateError({
      field: 'confirmPassError', 
      message: approvedConfirmPassError
    });

    if (approvedEmailError || approvedUserNameError || approvedPasswordError || approvedConfirmPassError) {
      return;
    };

    setStep(2);
  };
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const approvedNameError = validName(state);
    const approvedSurnameError = validSurnaame(state);
        
    setError(prev => ({
      ...prev,
      nameError: approvedNameError,
      surnameError: approvedSurnameError
    }));

    if (approvedNameError || approvedSurnameError) {
      return;
    };

    console.log(approvedNameError);
    
    navigate('/travel-share');
  };

  return (
    <div className={classes.registration}>
      <div className={classes.registrationBody}>
        <p className={classes.registrationTitle}>CREATE ACCOUNT</p>

        <form
          className={`${classes.form} ${step === 1 ? classes.active : ''}`}
          onSubmit={handleFirstSubmit}
        >
          <div className={classes.inputDiv}>
            {error.emailError && <p className={classes.errorMessage}>{error.emailError}</p>}
            <input
              className={classes.registrationFields}
              type="email"
              placeholder="Email"
              name="email"
              value={state.email}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
            />
          </div>

          <div className={classes.inputDiv}>
            {error.userNameError && <p className={classes.errorMessage}>{error.userNameError}</p>}
            <input
              className={classes.registrationFields}
              type="text"
              placeholder="Username"
              name="userName"
              value={state.userName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
            />
          </div>

          <div className={classes.inputDiv}>
            {error.passwordError && <p className={classes.errorMessage}>{error.passwordError}</p>}
            <input
              className={classes.registrationFields}
              type="password"
              placeholder="Password"
              name="password"
              value={state.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              required
            />
          </div>

          <div className={classes.inputDiv}>
            {error.confirmPassError && <p className={classes.errorMessage}>{error.confirmPassError}</p>}
            <input
              className={classes.registrationFields}
              type="password"
              placeholder="Confirm Password"
              name="confirmPass"
              value={state.confirmPass}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.registrationFirstButton}>
            <button 
              type="submit"   
            >
              Next
              <GoChevronRight size={40} />
            </button>
          </div>
        </form>

        <form className={`${classes.form} ${step === 2 ? classes.active : ''}`}>
          <p>You may skip the following fields if you wish</p>

          <div className={classes.inputDiv}>
            {error.nameError && <p className={classes.errorMessage}>{error.nameError}</p>}
            <input
              className={classes.registrationFields}
              type="text"
              placeholder="Name"
              name="name"
              value={state.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className={classes.inputDiv}>
            {error.surnameError && <p className={classes.errorMessage}>{error.surnameError}</p>}
            <input
              className={classes.registrationFields}
              type="text"
              placeholder="Surname"
              name="surname"
              value={state.surname}
              onChange={handleChange}
            />
          </div>

          <div className={classes.secondPageButtons}>
            <button 
              type="button"
              className={classes.backToStartButton}
              onClick={() => setStep(1)}
            >
              <GoChevronLeft size={30} />
            </button>

            <button 
              type="button"
              className={classes.registrationButton}
              onClick={handleClick}
            >
              Registration
            </button>
          </div>
        </form>

        <div className={classes.registrationGuide}>
          <p>Already have an account?</p>
          <Link className={classes.linkToLogin} to="/user-login">Login</Link>
        </div>
      </div>
    </div>
  );
}
