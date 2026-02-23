import React, { useState, useReducer, useRef, useEffect } from 'react';
import classes from './EditProfile.module.css';
import { useUser } from '../../../../context/UserContext';
import $api, { API_URL } from '../../../../http';
import { IoMdClose as IoMdCloseIcon } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../../../../services/AuthService';

export default function EditProfile() {
  const IoMdClose = IoMdCloseIcon as unknown as React.FC<{ className: string }>;

  type State = {
    email?: string,
    username?: string,
    name?: string,
    surname?: string,
    password?: string,
    newPass?: string, 
    confirmNewPass?: string
  };

  type Action = 
  | { type: 'CHANGE_FIELD'; name: keyof State; value: string }
  | { type: 'RESET_FORM' };

  type ErrorState = {
    emailError?: string;
    usernameError?: string;
    nameError?: string;
    surnameError?: string;
    newPassError?: string;
    confirmNewPassError?: string;
  };

  const initialState = {
    email: '',
    username: '',
    name: '',
    surname: '',
    password: '',
    newPass: '',
    confirmNewPass: ''
  }; 

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case 'CHANGE_FIELD':
        return {
          ...state,
          [action.name]: action.value
        };

      case 'RESET_FORM':
        return initialState;
      
      default:
        return state;
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const [error, setError] = useState<ErrorState>({});
  const [passFieldError, setPassFieldError] = useState<string>('');

  const fileRef = useRef<HTMLInputElement | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const { user, setUser } = useUser();

  const handleImageUpload = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setImgPreview(URL.createObjectURL(file));
  };


  const uploadAvatar = async(file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    let response = await $api.post(`${API_URL}/api/user/upload/profile`, formData);

    return response.data
  }

  let nameFirtLetter = user?.username[0].toUpperCase();
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

  const validUsername = (state: State): string => {
    if (!state.username) return '';
    const startsWithLetterRegex = /^[a-zA-Z]/;
    const lettersAndNumbersOnlyRegex = /^[a-zA-Z0-9]+$/;
    let nameFirstChar = state.username?.charAt(0).toLowerCase();
    let nameChars = '';

    if (!startsWithLetterRegex.test(state.username)) {
      return 'Your username must start with Latin letter';
    } else if (!lettersAndNumbersOnlyRegex.test(state.username)) {
      return 'Your name must contain only Latin letters and numbers';
    } else if (state.username.length < 5) {
      return 'Your username cannot contain fewer than 5 characters';
    } else if (state.username.length > 15) {
      return 'Your username cannot contain more than 15 charactes';
    }

    for (let i = 0; i < state.username.length; i++) {
      if (state.username[i].toLowerCase() === nameFirstChar) {
        nameChars += state.username[i];
      }

      if (nameChars.length === state.username.length) {
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
    if (!state.confirmNewPass) return '';
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
      type: 'CHANGE_FIELD',
      name: e.target.name as keyof State,
      value: e.target.value
    })
  };
    
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => { 
    e.preventDefault();
    
    const newErrors = {
      emailError: validEmail(state),
      usernameError: validUsername(state),
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

    try {
      let newProfilePicture = user?.profilePicture;

      if (avatarFile) {
        const avatarResponse = await uploadAvatar(avatarFile);
        newProfilePicture = avatarResponse.profilePicture;
      }

      let response = await AuthService.edit(state);
      console.log(response.data)

      const apiUser = response.data.data.user;

      dispatch({ type: 'RESET_FORM' });
      setAvatarFile(null);
      setImgPreview(null);
      
      setUser({
        username: apiUser.username,
        email: apiUser.email,
        name: apiUser.name,
        surname: apiUser.surname,
        profilePicture: newProfilePicture ?? apiUser.profilePicture,
        isActive: apiUser.isActive,
        followers: apiUser.followers,
        following: apiUser.following,
        userId: apiUser.userId
      });
      
      localStorage.setItem('token', response.data.data.accessToken);

    }catch (error: unknown) {
      if (axios.isAxiosError(error))  return;
    }
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
            (profilePic_URL || imgPreview)
              ? (
                  <img
                    className={classes.profilePic}
                    src={imgPreview ?? profilePic}
                    alt="Profile-Picture"
                  />
                )
              : (
                  <div className={classes.letterShadow}>
                    <p className={classes.nameLetter}>{nameFirtLetter}</p>
                  </div>
                )
          }

          <button 
            className={classes.photoButton}
            onClick={handleImageUpload}
            >Change Photo
          </button>

          <input 
            ref={fileRef}
            type='file'
            accept='image/*'
            hidden
            onChange={handleFileChange}
          />
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
              placeholder={user?.email ? user.email : "Email"}
            />  
          </div>

          <div className={classes.pools}> 
            {error.usernameError ? 
              <p className={classes.errorMessage}>{error.usernameError}</p>
              : 
              <p className={classes.fieldName}>Username</p>
            }  
            <input
              className={classes.dataInput} 
              type='name'
              value={state.username}
              name='username'
              onChange={handleChange}
              placeholder={user?.username ? user.username : "Userame"}
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
              placeholder={user?.surname ? user.surname : "Surname"}
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
