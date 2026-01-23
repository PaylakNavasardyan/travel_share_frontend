import React from 'react'
import classes from './UserProfille.module.css'
import { useUser } from '../../../../context/UserContext'
import { GoChevronLeft as GoChevronLeftIcon } from "react-icons/go";

export default function UserProfile() {
  const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ className: string}>;

  const { user } = useUser();
  const nameFirtLetter = user?.userName[0].toUpperCase();

  return (
    <div className={classes.profile}>
      <div className={classes.profileBar}>
        <div className={classes.icon}>
          <div className={classes.backgroundForIcon}>
            <GoChevronLeft className={classes.goLeftIcon}/>
          </div>
        </div>

        <div className={classes.profileInfo}>
          <div className={classes.profileImage}>
            <p className={classes.nameLetter}>{nameFirtLetter}</p>
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
