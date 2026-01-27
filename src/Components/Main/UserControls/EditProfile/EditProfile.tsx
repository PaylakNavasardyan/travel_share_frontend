import React from 'react';
import classes from './EditProfile.module.css';
import { useUser } from '../../../../context/UserContext';
import { API_URL } from '../../../../http';
import { IoMdClose as IoMdCloseIcon } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const IoMdClose = IoMdCloseIcon as unknown as React.FC<{ className: string }>;

    const navigate = useNavigate();

    const { user } = useUser();
    
    let nameFirtLetter = user?.userName[0].toUpperCase();
    let profilePic_URL = user?.profilePicture;
    let profilePic = `${API_URL}/api/user/profile/${profilePic_URL}`

  return (
    <div className={classes.editModal}>
      <div className={classes.editModalBody}>
        <div className={classes.editProfilePic}>
            <div 
                className={classes.goBackShadow}
                onClick={() => navigate(-1)}>
                <IoMdClose className={classes.goBackButton}/>
            </div>

            {/* <img 
                className={classes.profilePic}
                src={profilePic}
                alt='Profile Picture'
            /> */}
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
                <p>Email</p>
                <input
                    className={classes.dataInput} 
                    type='email'
                    placeholder={user?.email}
                />
            </div>

            <div className={classes.pools}>    
                <p>Username</p>
                <input
                    className={classes.dataInput} 
                    type='name'
                    placeholder={user?.userName}
                />
            </div>

            <div className={classes.pools}>    
                <p>Name</p>
                <input
                    className={classes.dataInput} 
                    type='name'
                    placeholder={user?.name ? user.name : "Name"}
                />
            </div>

            <div className={classes.pools}>    
                <p>Surname</p>
                <input
                    className={classes.dataInput} 
                    type='name'
                    placeholder={user?.name ? user.name : "Surname"}
                />
            </div>

            <div className={classes.pools}>    
                <p>Password</p>
                <input
                    className={classes.dataInput} 
                    type='password'
                    placeholder='Password'
                />
            </div>

            <div className={classes.pools}>    
                <p>New Password</p>
                <input
                    className={classes.dataInput} 
                    type='password'
                    placeholder='New Password'
                />
            </div>

            <div className={classes.pools}>    
                <p>Confirm New Password</p>
                <input
                    className={classes.dataInput} 
                    type='password'
                    placeholder='Confirm New Password'
                />
            </div>

            <button className={classes.dataButton}>Save</button>
        </div>
      </div>
    </div>
  )
}
