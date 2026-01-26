import React from 'react'
import classes from './UserProfille.module.css'
import { useUser } from '../../../../context/UserContext'
import { GoChevronLeft as GoChevronLeftIcon } from "react-icons/go";
import { API_URL } from '../../../../http/index' 
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ className: string}>;

  const { user } = useUser();

  let nameFirtLetter = user?.userName[0].toUpperCase();
  let profilePic_URL = user?.profilePicture;
  let profilePic = `${API_URL}/api/user/profile/${profilePic_URL}`

  const navigate = useNavigate();

  return (
    <div className={classes.profile}>
      <div className={classes.profileBar}>
        <div className={classes.icon}>
          <div 
            className={classes.backgroundForIcon}
            onClick={() => navigate(-1)}
          >
            <GoChevronLeft className={classes.goLeftIcon}/>
          </div>
        </div>

        <div className={classes.profileInfo}>
          <div className={classes.profileImage}>
            {
              profilePic_URL 
                ? 
                <img 
                  className={classes.profilePic}
                  src={profilePic}
                  alt="Profile-Picture" />
                : 
                <p className={classes.nameLetter}>{nameFirtLetter}</p> 
            }
          </div>

          <div className={classes.personalInfo}>
            <p className={`${classes.userData} ${classes.userName}`}>{user?.userName}</p>
            <p className={classes.userData}>{user?.email}</p>
            <p className={classes.userData}>{user?.name}</p>
            <p className={classes.userData}>{user?.surname}</p>
          </div>
        </div>
      </div>

      <div className={classes.profilePosts}>
      
      </div>
    </div>
  )
}
