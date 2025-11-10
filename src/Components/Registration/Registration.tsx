import { useReducer } from 'react';
import classes from './Registration.module.css';
import { GoChevronRight as GoChevronRightIcon } from "react-icons/go";
import { Link } from 'react-router-dom';

export default function Registration() {
  const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ size?: number; style?: React.CSSProperties }>;

  type State = {
    email: string,
    userName: string,
    password: string,
    confirmPass: string
  };

  type Action = {
    name: keyof State,
    value: string
  };

  const initialState: State = {
    email: '',
    userName: '',
    password: '',
    confirmPass: ''
  };

  function reducer(state: State, action: Action) {
    return {
      ...state,
      [action.name]: action.value
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      name: e.target.name as keyof State,
      value: e.target.value,
    });
  };

  return (
    <div className={classes.registration}>
      <div className={classes.registrationBody}>
        <p className={classes.registrationTitle}>CREATE ACCOUNT</p>

        <form>
          <div className={classes.inputDiv}>
            <input
              className={classes.registrationFields}
              type="email"
              placeholder="Email"
              name='email'
              value={state.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.inputDiv}>
            <input
              className={classes.registrationFields}
              type="text"
              placeholder="Username"
              name='username'
              value={state.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.inputDiv}>
            <input
              className={classes.registrationFields}
              type="password"
              placeholder="Password"
              name='password'
              value={state.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.inputDiv}>
            <input
              className={classes.registrationFields}
              type="password"
              placeholder="Confirm Password"
              name='confirm password'
              value={state.confirmPass}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.registrationFirstBottom}>
            <button type="submit">
              Next
              <GoChevronRight size={40}/>
            </button>
          </div>
        </form>

        <div className={classes.registrationGuide}>
          <p>Already have an account?</p>
          <Link 
            className={classes.linkToLogin}
            to={'/Login'}
          >Login</Link>
        </div>
      </div>
    </div>
  );
}
