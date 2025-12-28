import React from 'react'
import classes from './Navbar.module.css';
import image from '../../../ExportImages';
import { GoSearch as GoSearchIcon } from "react-icons/go";

export default function Navbar() {
  const GoSearch = GoSearchIcon as unknown as React.FC<{ className: string }>

  return (
    <div className={classes.navbar}>
      <div className={classes.navbarBody}>
        <div className={classes.navbarLogo}>
          <img className={classes.logo} src={image.logo} alt="logo" />
        </div>

        <div className={classes.navbarSearchBar}>
          <form>
            <input 
              className={classes.inputPool}
              type='text'
              placeholder='Search'
              name='search'
            />

            <GoSearch className={classes.searchIcon} />
          </form>
        </div>
      </div>
    </div>
  )
}
