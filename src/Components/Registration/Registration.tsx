import React, { useReducer, useState } from 'react';
import classes from './Registration.module.css';
import { GoChevronRight as GoChevronRightIcon } from "react-icons/go";
import { GoChevronLeft as GoChevronLeftIcon } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';

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

  function reducer(state: State, action: Action) {
    return { ...state, [action.name]: action.value };
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [step, setStep] = useState<number>(1);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/TravelShare');
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
    setStep(2);
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
