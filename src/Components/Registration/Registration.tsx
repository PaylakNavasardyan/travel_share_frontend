import classes from './Registration.module.css';
import { GoChevronRight as GoChevronRightIcon } from "react-icons/go";
import { Link } from 'react-router-dom';

export default function Registration() {
   const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ size?: number; style?: React.CSSProperties }>;
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
              required
            />
          </div>

          <div className={classes.inputDiv}>
            <input
              className={classes.registrationFields}
              type="text"
              placeholder="Username"
              required
            />
          </div>

          <div className={classes.inputDiv}>
            <input
              className={classes.registrationFields}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <div className={classes.inputDiv}>
            <input
              className={classes.registrationFields}
              type="password"
              placeholder="Confirm Password"
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
