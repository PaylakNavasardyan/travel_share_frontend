import React from 'react'
import classes from './CreatePosts.module.css'
import { LiaPhotoVideoSolid as LiaPhotoVideoSolidIcon } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';

export default function CreatePosts() {
  const LiaPhotoVideoSolid = LiaPhotoVideoSolidIcon as unknown as React.FC<{className: string}> 

  const navigate = useNavigate();
  return (
    <div className={classes.postsModal}>
      <div className={classes.postsBody}> 
        <textarea 
          className={classes.postDescription} 
          placeholder='Description'>
        </textarea>
    
        <div className={classes.postPicture}>
          <LiaPhotoVideoSolid className={classes.picIcon}/>
          <span className={classes.tooltip}>Upload Photo or Video</span>
        </div>

        <div className={classes.postButtons}>
          <button 
            className={`${classes.refuse}
            ${classes.button}`}
            onClick={() => navigate(-1)}>
              Refuse
          </button>

          <button
            className={`${classes.confirm}
            ${classes.button}`}>
              Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
