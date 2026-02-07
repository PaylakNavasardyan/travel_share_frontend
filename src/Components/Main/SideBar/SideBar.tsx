import React, { useState } from 'react'
import classes from './SideBar.module.css'
import { IoMdSettings as IoMdSettingsIcon} from "react-icons/io";
import { 
  RiUserReceived2Fill as RiUserReceived2FillIcon,
  RiUserSharedFill as RiUserSharedFillIcon,
  RiLogoutBoxRLine as RiLogoutBoxRLineIcon
} from "react-icons/ri";
import { ImProfile as ImProfileIcon } from "react-icons/im";
import { FaPlus as FaPlusIcon, FaRegEdit as FaRegEditIcon  } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const RiUserReceived2Fill = RiUserReceived2FillIcon as unknown as React.FC<{ className: string }>
  const RiUserSharedFill = RiUserSharedFillIcon as unknown as React.FC<{ className: string}>
  const ImProfile = ImProfileIcon as unknown as React.FC<{ className: string}>
  const FaPlus = FaPlusIcon as unknown as React.FC<{ className: string }>
  const IoMdSettings = IoMdSettingsIcon as unknown as React.FC<{ className: string }>
  const FaRegEdit = FaRegEditIcon as unknown as React.FC<{ className: string }>
  const RiLogoutBoxRLine = RiLogoutBoxRLineIcon as unknown as React.FC<{ className: string }>
  
  const location = useLocation();

  const[isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (): void => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className={classes.sideBar}>   
      <Link
        to='/followers'
        state={{ backgroundLocation: location }}
        className={classes.sideBarLink}
        >
        
        <div className={`${classes.sideNav} ${classes.followersPart}`}>
          <RiUserSharedFill  className={classes.icon} />
          <span>Followers</span>
        </div>
      </Link>

      <Link
        to='/following'
        state={{ backgroundLocation: location }}
        className={classes.sideBarLink}
        >
        <div className={`${classes.sideNav} ${classes.followingPart}`}>
          <RiUserReceived2Fill  className={classes.icon} />
          <span>Following</span>
        </div>
      </Link>

      <Link
        to='/my-profile'
        className={classes.sideBarLink}
        >

        <div className={`${classes.sideNav} ${classes.settingsPart}`}>
          <ImProfile  className={classes.icon} />
          <span>My Profile</span> 
        </div>
      </Link>

      <Link
        to='/create-posts'
        state={{ backgroundLocation: location }}
        className={classes.sideBarLink}
        >

        <div className={`${classes.sideNav} ${classes.settingsPart}`}>
          <FaPlus  className={classes.icon} />
          <span>Create Posts</span>
        </div>
      </Link>

      <div 
        className={`${classes.sideBarLink} ${classes.initSetting}`} 
        onClick={handleChange}
      >

        <div className={`${classes.sideNav} ${classes.settingsPart}`}>
          <IoMdSettings  className={classes.icon} />
          <span>Settings</span>
        </div>  
      </div>

      <div className={isOpen ? classes.active : classes.passive}>
        <Link
          to='/edit-profile'
          state={{ backgroundLocation: location }}
          className={classes.settingBarLink}
        >
          <FaRegEdit className={classes.icon}/>
          <span>Edit Profile</span>
        </Link>

        <Link
          to='/user-logout'
          state={{ backgroundLocation: location }}
          className={classes.settingBarLink}
        >
          <RiLogoutBoxRLine className={classes.icon}/>
          <span>Logout</span>
        </Link>
      </div>
    </div>
  
  )
}
