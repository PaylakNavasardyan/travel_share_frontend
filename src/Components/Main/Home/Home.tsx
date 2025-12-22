import React from 'react';
import classes from './Home.module.css';
import { NavLink } from 'react-router-dom';

export default function Home() {
    
  return (
    <div className={classes.home}>
        <div className={classes.homeTopPart}>
            <div className={classes.explore}>
                <NavLink 
                    to='' 
                    end   
                    className={classes.navlink}
                    >
                        {({isActive}) => (
                            <>
                                <span className={classes.linkToAllPosts}>
                                    All Posts
                                </span>
                                <div className={`${classes.line} ${isActive ? classes.activeLine : ''}`}></div>
                            </>
                        )}
                </NavLink>
            </div>
            <div className={classes.explore}>
                <NavLink to='friends-posts' className={classes.navlink}>
                    {({isActive}) => (
                        <>
                            <span className={classes.linkToAllPosts}>
                                Friends Posts
                            </span>

                            <div className={`${classes.line} ${isActive ? classes.activeLine : ''}`}></div>  
                        </>
                    )} 
                </NavLink>
            </div>
            <div className={classes.explore}>
                <NavLink to='my-posts' className={classes.navlink}>
                    {({isActive}) => (
                        <>
                            <span className={classes.linkToAllPosts}>
                                My Posts
                            </span>

                            <div className={`${classes.line} ${isActive ? classes.activeLine : ''}`}></div>  
                        </>
                    )} 
                </NavLink>

            </div>
        </div>
    </div>
  )
}
