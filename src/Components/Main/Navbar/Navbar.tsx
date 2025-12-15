import React from 'react'
import classes from './Navbar.module.css';
import image from '../../../ExportImages';
import { GoSearch as GoSearchIcon } from "react-icons/go";
import { IoMdSettings as IoMdSettingsIcon} from "react-icons/io";

export default function Navbar() {
  const GoSearch = GoSearchIcon as unknown as React.FC<{ className: string, size: number, color: string }>
  const IoMdSettings = IoMdSettingsIcon as unknown as React.FC<{ className: string, size: number, color: string }>

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarBody}>
        <div className={classes.navbarLogo}>
          <img src={image.logo} alt="logo" />
        </div>

        <div className={classes.navbarSearchBar}>
          <form>
            <input 
              className={classes.inputPool}
              type='text'
              placeholder='Search'
              name='search'
            />

            <GoSearch className={classes.searchIcon} size={18} color='#9ca3af'/>
          </form>
        </div>

        <div className={classes.navbarSettings}>
          <IoMdSettings  className={classes.settingIcon} size={25} color='#4848A0FF'/>
        </div>
      </div>
    </div>
  )
}
