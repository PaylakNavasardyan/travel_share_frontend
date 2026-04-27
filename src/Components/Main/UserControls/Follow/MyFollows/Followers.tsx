import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Followers.module.css';
import { IoMdClose as IoMdCloseIcon } from "react-icons/io";
import { GoSearch as GoSearchIcon } from "react-icons/go";
import { GetFollow } from '../CreateFollow/GetFollow';
import  FollowType  from '../../../../../types/follow';
import { API_URL } from '../../../../../http';

export default function Follow() {
  const IoMdClose = IoMdCloseIcon as unknown as React.FC<{ className: string }>;
  const GoSearch = GoSearchIcon as unknown as React.FC<{ className: string}>;

  const [followers, setFollowers] = useState<FollowType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetFollow();
      setFollowers(data);
    };
    fetchData();
  }, []);

  const handleClick = ():void => {
    navigate(-1);
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalBody}>
        <div className={classes.goBack} onClick={handleClick}>
          <IoMdClose className={classes.XIcon}/>
        </div>

        <div className={classes.modalGuide}>
          <span>Followers</span>

          <input 
            className={classes.inputPool}
            type='text'
            placeholder='Search'
            name='search'
          />

          <GoSearch className={classes.searchIcon} />
        </div>

        <div className={classes.modalLine}></div>

        <div className={classes.followersList}>
          {followers.length > 0 ? (
            followers.map((follower) => (
              <div key={follower.followId} className={classes.followerItem}>
                {follower.profilePicture
                 ? 
                  <img 
                    src={`${API_URL}/api/user/profile/${follower.profilePicture}`}
                    alt='profile-pic'
                    className={classes.profilePic}
                  />
                 :
                  <div className={classes.firstLetter}>
                    <p className={classes.letter}>{follower.username[0].toUpperCase()}</p>
                  </div>
                }
                <span className={classes.username}>@{follower.username}</span>
              </div>
            ))
          ) : (
            <p style={{
              fontSize: '20px',
              color: '#4848A0FF',
              fontFamily: 'poppins-semiBold',
              marginTop: '100px'
            }}>No followers yet</p>
          )}

        </div>
      </div>
    </div>
  );
}
