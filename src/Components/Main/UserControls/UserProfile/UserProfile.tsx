import React  from 'react'
import classes from './UserProfille.module.css'
import { useUser } from '../../../../context/UserContext'
import { GoChevronLeft as GoChevronLeftIcon } from "react-icons/go";
import { API_URL } from '../../../../http/index' 
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ className: string}>;
  
  const { user } = useUser();

  let isActive = user?.isActive;
  let nameFirtLetter = user?.username[0].toUpperCase();
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
            <p className={`${classes.userData} ${classes.userName}`}>{user?.username}</p>
            <p className={classes.userData}>{user?.email}</p>
            <p className={classes.userData}>{user?.name}</p>
            <p className={classes.userData}>{user?.surname}</p>
          </div>
          {
            isActive === true
            ?
              ''
            :
              <p className={classes.isActiveMessage}>Please verify your email to activate your account. We've sent a confirmation link to your inbox</p>
          }
        </div>
      </div>

      <div className={classes.profilePosts}>
      
      </div>
    </div>
  )
}
