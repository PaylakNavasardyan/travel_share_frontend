import React, { useState, useReducer } from 'react';
import classes from './EditProfile.module.css';
import { useUser } from '../../../../context/UserContext';
import { API_URL } from '../../../../http';
import { IoMdClose as IoMdCloseIcon } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const IoMdClose = IoMdCloseIcon as unknown as React.FC<{ className: string }>;

  type State = {
    email: string,
    userName: string,
    name: string,
    surname: string,
    password: string,
    newPass: string, 
    confirmNewPass: string
  };

  type Action = {
    name: keyof State,
    value: string
  };

  type ErrorState = {
    emailError?: string;
    userNameError?: string;
    nameError?: string;
    surnameError?: string;
    newPassError?: string;
    confirmNewPassError?: string;
  };

  const initialState = {
    email: '',
    userName: '',
    name: '',
    surname: '',
    password: '',
    newPass: '',
    confirmNewPass: ''
  }; 

  function reducer(state: State, action: Action) {
    return {
      ...state,
      [action.name]: action.value
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const [error, setError] = useState<ErrorState>({});
  const [passFieldError, setPassFieldError] = useState<string>('');

  const { user } = useUser();

  let nameFirtLetter = user?.userName[0].toUpperCase();
  let profilePic_URL = user?.profilePicture;
  let profilePic = `${API_URL}/api/user/profile/${profilePic_URL}`;

  const validEmail = (state :State): string => {
    if (!state.email) return '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validUserName = (state: State): string => {
    if (!state.userName) return '';
    const startsWithLetterRegex = /^[a-zA-Z]/;
    const lettersAndNumbersOnlyRegex = /^[a-zA-Z0-9]+$/;
    let nameFirstChar = state.userName?.charAt(0).toLowerCase();
    let nameChars = '';

    if (!startsWithLetterRegex.test(state.userName)) {
      return 'Your username must start with Latin letter';
    } else if (!lettersAndNumbersOnlyRegex.test(state.userName)) {
      return 'Your name must contain only Latin letters and numbers';
    } else if (state.userName.length < 5) {
      return 'Your username cannot contain fewer than 5 characters';
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

  const validNewPass = (state: State): string => {
    if (!state.newPass) return '';
    const startsWithLetterRegex = /^[a-zA-Z]/;
    const passCharactersRegex = /^[a-zA-Z0-9_.-]+$/;
    let passFirstChar = state.newPass.charAt(0).toLowerCase();
    let passChars = '';
    
    if (!startsWithLetterRegex.test(state.newPass)) {
      return 'Password must start with Latin letter';
    } else if (!passCharactersRegex.test(state.newPass)) {
      return 'Password can contain only Latin letters numbers and (-, _, .)';
    } else if (state.newPass.length < 6) {
      return 'Password cannot contain fewer than 6 characters';
    } else if (state.newPass.length > 15) {
      return 'Password cannot contain more than 15 characters';
    }

    for (let i = 0; i < state.newPass.length; i++) {
      if (state.newPass[i].toLowerCase() === passFirstChar) {
        passChars += state.newPass[i];
      }
  
      if (passChars.length === state.newPass.length) {
        return 'Password cannot contain only identical characters';
      }
    }
    return '';
  };

  const validConfirmNewPass = (state: State): string => {
    if (!validConfirmNewPass) return '';
    if (state.confirmNewPass !== state.newPass) {
      return 'Repeat Password does not match with Password';
    }
    return '';
  };

  const validName = (state: State): string => {
    if (!state.name) return '';
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

  const validSurname = (state: State): string => {
    if (!state.surname) return '';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({
      name: e.target.name as keyof State,
      value: e.target.value
    })
  };

    
  const handleClick = async(e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
         
    const newErrors = {
      emailError: validEmail(state),
      userNameError: validUserName(state),
      nameError: validName(state),
      surnameError: validSurname(state),
      newPassError: validNewPass(state),
      confirmNewPassError: validConfirmNewPass(state),
    };

    setError(newErrors);

    const passFields = [state.password, state.newPass, state.confirmNewPass];
    const hasAll = passFields.every(Boolean);
    const hasAny = passFields.some(Boolean);

    if (hasAny && !hasAll) {
      setPassFieldError(
        'All password fields are required if you start filling any of them'
      );
      return;
    } else {
      setPassFieldError('');
    }

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;
  }

  return (
    <div className={classes.editModal}>
      <div className={classes.editModalBody}>
        <div className={classes.editProfilePic}>
          <div 
            className={classes.goBackShadow}
            onClick={() => navigate(-1)}>
            <IoMdClose className={classes.goBackButton}/>
          </div>

          {
            profilePic_URL 
              ? 
              <img 
                className={classes.profilePic}
                src={profilePic}
                alt="Profile-Picture" />
              : 
              <div className={classes.letterShadow}>
                <p className={classes.nameLetter}>{nameFirtLetter}</p> 
              </div>
          }

          <button className={classes.photoButton}>Change Photo</button>
        </div>

        <div className={classes.editProfileData}>
          <div className={classes.pools}>    
            {error.emailError ? 
              <p className={classes.errorMessage}>{error.emailError}</p>
              : 
              <p className={classes.fieldName}>Email</p>
            }  
            <input
              className={classes.dataInput} 
              type='email'
              value={state.email}
              name='email'
              onChange={handleChange}
              placeholder={user?.email}
            />  
          </div>

          <div className={classes.pools}> 
            {error.userNameError ? 
              <p className={classes.errorMessage}>{error.userNameError}</p>
              : 
              <p className={classes.fieldName}>Username</p>
            }  
            <input
              className={classes.dataInput} 
              type='name'
              value={state.userName}
              name='userName'
              onChange={handleChange}
              placeholder={user?.userName}
            />
          </div>

          <div className={classes.pools}>  
            {error.nameError ? 
              <p className={classes.errorMessage}>{error.nameError}</p>
              : 
              <p className={classes.fieldName}>Name</p>
            }
            <input
              className={classes.dataInput} 
              type='name'
              value={state.name}
              name='name'
              onChange={handleChange}
              placeholder={user?.name ? user.name : "Name"}
              />
          </div>

          <div className={classes.pools}>    
            {error.surnameError ? 
              <p className={classes.errorMessage}>{error.surnameError}</p>
              : 
              <p className={classes.fieldName}>Surname</p>
            }
            <input
              className={classes.dataInput} 
              type='name'
              value={state.surname}
              name='surname'
              onChange={handleChange}
              placeholder={user?.name ? user.name : "Surname"}
            />
          </div>

          <div className={classes.pools}>    
            <p className={classes.fieldName}>Password</p>
            <input
              className={classes.dataInput} 
              type='password'
              value={state.password}
              name='password'
              onChange={handleChange}
              placeholder='Password'
            />
          </div>

          <div className={classes.pools}>  
            {error.newPassError ? 
              <p className={classes.errorMessage}>{error.newPassError}</p>
              : 
              <p className={classes.fieldName}>New Password</p>
            }
            <input
              className={classes.dataInput} 
              type='password'
              value={state.newPass}
              name='newPass'
              onChange={handleChange}
              placeholder='New Password'
            />
          </div>

          <div className={classes.pools}>   
            {error.confirmNewPassError ? 
              <p className={classes.errorMessage}>{error.confirmNewPassError}</p>
              : 
              <p className={classes.fieldName}>Confirm New Password</p>
            }
            <input
              className={classes.dataInput} 
              type='password'
              value={state.confirmNewPass}
              name='confirmNewPass'
              onChange={handleChange}
              placeholder='Confirm New Password'
            />
          </div>

          {passFieldError && 
            <p className={classes.passFielErrorMessage}>
              {passFieldError}
            </p>
          }

          <button 
            className={classes.dataButton}
            onClick={handleClick}   
          >
          Save
          </button>
        </div>
      </div>
    </div>
  )
}
