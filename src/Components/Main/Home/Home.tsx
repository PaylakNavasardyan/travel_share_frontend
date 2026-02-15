import React, { useEffect, useRef, useState } from 'react';
import classes from './Home.module.css';
import { NavLink } from 'react-router-dom';

export default function Home() {
    const [showMenu, setShowMenu] = useState<boolean>(true);
    const lastScrollY = useRef(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        lastScrollY.current = window.scrollY;

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            if (currentScroll <= 0) {
                setShowMenu(true);
            } else if (currentScroll > lastScrollY.current) {
                setShowMenu(false);
            } else {
                timeoutRef.current = setTimeout(() => {
                    setShowMenu(true);
                }, 500);
            }

            lastScrollY.current = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={classes.home}>
            <div className={`${classes.homeTopPart} ${!showMenu ? classes.hiddenTop : ''}`}>
                <div className={classes.explore}>
                    <NavLink
                        to=''
                        end
                        className={classes.navlink}
                    >
                        {({ isActive }) => (
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
                        {({ isActive }) => (
                            <>
                                <span className={classes.linkToAllPosts}>
                                    Friends Posts
                                </span>
                                <div className={`${classes.line} ${isActive ? classes.activeLine : ''}`}></div>
                            </>
                        )}
                    </NavLink>
                </div>
            </div>

            <div className={classes.navSpacer} />
        </div>
    );
}