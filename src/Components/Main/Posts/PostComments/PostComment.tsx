import React, { useState } from 'react';
import classes from './PostComment.module.css';
import { IoIosSend as IoIosSendIcon } from "react-icons/io";

export default function PostComment() {
    const IoIosSend = IoIosSendIcon as unknown as React.FC<{ className : string }>;

    const [comment, setComment] = useState<string>('');   

  return (
    <div className={classes.commentArea}>
        <textarea
            className={comment.length > 0 ? classes.existedComment : classes.comment} 
            placeholder='Add a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
        >
        </textarea>

        <div className={comment.length > 0 ? classes.existedIconArea : classes.iconArea}>
            <span className={classes.postComment}>Post</span>
            <IoIosSend className={classes.sendIcon} />    
        </div>
    </div>
  )
}
