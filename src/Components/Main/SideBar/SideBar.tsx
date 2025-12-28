import React from 'react'
import classes from './SideBar.module.css'
import { IoMdSettings as IoMdSettingsIcon} from "react-icons/io";
import { RiUserReceived2Fill as RiUserReceived2FillIcon, RiUserSharedFill as RiUserSharedFillIcon} from "react-icons/ri";
import { ImProfile as ImProfileIcon } from "react-icons/im";
import { FaPlus as FaPlusIcon } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
    const RiUserReceived2Fill = RiUserReceived2FillIcon as unknown as React.FC<{ className: string, size: number, color: string }>
    const RiUserSharedFill = RiUserSharedFillIcon as unknown as React.FC<{ className: string, size: number, color: string}>
    const ImProfile = ImProfileIcon as unknown as React.FC<{ className: string, size: number, color: string}>
    const FaPlus = FaPlusIcon as unknown as React.FC<{ className: string, size: number, color: string }>
    const IoMdSettings = IoMdSettingsIcon as unknown as React.FC<{ className: string, size: number, color: string }>
    
    const location = useLocation();
    return (
      <div className={classes.sideBar}>   
      <Link
        to='/follow'
        state={{ backgroundLocation: location }}
        className={classes.sideBarLink}
        >
        
        <div className={`${classes.sideNav} ${classes.followersPart}`}>
          <RiUserSharedFill  className={classes.icon} size={25} color='#FF5A5FFF'/>
          <span>Followers</span>
        </div>
      </Link>

        <div className={`${classes.sideNav} ${classes.followingPart}`}>
          <RiUserReceived2Fill  className={classes.icon} size={25} color='#FF5A5FFF'/>
          <span>Following</span>
        </div>

        <div className={`${classes.sideNav} ${classes.settingsPart}`}>
          <ImProfile  className={classes.icon} size={25} color='#FF5A5FFF'/>
          <span>My Profile</span> 
        </div>

        <div className={`${classes.sideNav} ${classes.settingsPart}`}>
          <FaPlus  className={classes.icon} size={25} color='#FF5A5FFF'/>
          <span>Create Posts</span>
        </div>

        <div className={`${classes.sideNav} ${classes.settingsPart}`}>
          <IoMdSettings  className={classes.icon} size={25} color='#FF5A5FFF'/>
          <span>Settings</span>
        </div>
    </div>
  )
}
