import { useNavigate } from 'react-router-dom';
import classes from './Followers.module.css';
import { IoMdClose as IoMdCloseIcon } from "react-icons/io";
import { GoSearch as GoSearchIcon } from "react-icons/go";

export default function Follow() {
  const IoMdClose = IoMdCloseIcon as unknown as React.FC<{ className: string }>
  const GoSearch = GoSearchIcon as unknown as React.FC<{ className: string}>
  const navigate = useNavigate();

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
      </div>
    </div>
    
  );
}
