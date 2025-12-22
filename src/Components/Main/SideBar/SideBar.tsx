import React from 'react'
import classes from './SideBar.module.css'
import { IoMdSettings as IoMdSettingsIcon} from "react-icons/io";
import { RiUserReceived2Fill as RiUserReceived2FillIcon, RiUserSharedFill as RiUserSharedFillIcon} from "react-icons/ri";

export default function SideBar() {
    const RiUserReceived2Fill = RiUserReceived2FillIcon as unknown as React.FC<{ className: string, size: number, color: string }>
    const RiUserSharedFill = RiUserSharedFillIcon as unknown as React.FC<{ className: string, size: number, color: string}>
    const IoMdSettings = IoMdSettingsIcon as unknown as React.FC<{ className: string, size: number, color: string }>
    
  return (
    <div className={classes.sideBar}>
         <div className={`${classes.sideNav} ${classes.followersPart}`}>
            <RiUserSharedFill  className={classes.icon} size={25} color='#FF5A5FFF'/>
            <span>Followers</span>
        </div>

         <div className={`${classes.sideNav} ${classes.followingPart}`}>
            <RiUserReceived2Fill  className={classes.icon} size={25} color='#FF5A5FFF'/>
            <span>Following</span>
        </div>

        <div className={`${classes.sideNav} ${classes.settingsPart}`}>
            <IoMdSettings  className={classes.icon} size={25} color='#FF5A5FFF'/>
            <span>Settings</span>
        </div>
    </div>
  )
}
