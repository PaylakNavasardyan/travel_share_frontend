import React, { useEffect } from 'react';
import classes from './DeletePost.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import $api from '../../../../http';

export default function DeletePost() {
  const location = useLocation();
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  const navigate = useNavigate();
  
  const deletePost = async() => {
    try {
      const postId = location.state?.postId;
      let response = await $api.delete(`/api/posts/${postId}`);
      
      if (response.status == 204) {
        navigate('/my-profile', { state: { refresh: true } });
      } else {
        navigate('/my-profile')
      } 
    }catch(error)  {
      console.log(error)
    };
  }
    
  return (
    <div className={classes.deleteModal}>
      <div className={classes.deleteBody}>
        <p className={classes.deleteText}>Are you sure you want to delete this post?</p>

        <div className={classes.buttons}>
          <button 
            className={`${classes.button} ${classes.cancelButton}`}
            onClick={() => navigate(-1)}    
          >Cancel</button>

          <button 
            className={`${classes.button} ${classes.deleteButton}`}
            onClick={deletePost}
          >Delete Post</button>
        </div>
      </div>
    </div>
  )
}
