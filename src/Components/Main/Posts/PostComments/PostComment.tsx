import React, { useState } from 'react';
import classes from './PostComment.module.css';
import { IoIosSend as IoIosSendIcon } from "react-icons/io";
import $api from '../../../../http';
import { CommentType } from '../../../../types/comment';
import { useSWRConfig } from 'swr';
import { getComment } from './GetComment';

interface Props {
  postId: string;
  onAddComment: (comment: CommentType) => void;
}

export default function PostComment({ postId, onAddComment }: Props) {
  const IoIosSend = IoIosSendIcon as unknown as React.FC<{ className: string }>;
  const { mutate } = useSWRConfig();

  const [comment, setComment] = useState<string>('');

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await $api.post('/api/comment/create', {
        postId,
        content: comment
      });

      onAddComment(response.data.data);

      const updatedComments = await getComment(postId);
      mutate(['comments', postId], updatedComments, false);

      setComment('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.commentArea}>
      <textarea
        className={comment.length > 0 ? classes.existedComment : classes.comment}
        placeholder='Add a comment...'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div
        className={comment.length > 0 ? classes.existedIconArea : classes.iconArea}
        onClick={handleComment}
      >
        <span className={classes.postComment}>Post</span>
        <IoIosSend className={classes.sendIcon} />
      </div>
    </div>
  );
}