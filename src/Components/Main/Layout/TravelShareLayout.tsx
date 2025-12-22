import classes from './TraveShareLayout.module.css'
import { Outlet } from 'react-router-dom'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'

export default function TravelShareLayout() {
  return (
    <div className={classes.layout}>
      <Navbar />

      <div className={classes.main}>
        <SideBar />

        <div className={classes.content}>
          <Home />
          <Outlet />
        </div>
      </div>
    </div>
  );
}