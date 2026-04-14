import classes from './PostContent.module.css';
import { CommentType } from '../../../../types/comment';
import { API_URL } from '../../../../http';
import { SlLike as SILikeIcon, SlDislike as SlDislikeIcon } from "react-icons/sl";
import { IoIosSend as IoIosSendIcon } from "react-icons/io";
import { GoReply as GoReplyIcon } from "react-icons/go";
import { useReaction } from '../UseReaction/useReaction';
import { getReplyComment } from '../PostComments/GetReplyComment';
import { useState } from 'react';
import useSWR from 'swr';
import $api from '../../../../http';
import ReplyItem from './ReplyItem';

interface CommentItemProps {
  comment: CommentType;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const SILike = SILikeIcon as unknown as React.FC<{ className: string }>;
  const SIDislike = SlDislikeIcon as unknown as React.FC<{ className: string }>;
  const GoReply = GoReplyIcon as unknown as React.FC<{ className: string }>;
  const IoIosSend = IoIosSendIcon as unknown as React.FC<{ className: string }>;

  const [replyText, setReplyText] = useState('');
  const [showReplies, setShowReplies] = useState(false);

  const { data: replies = [], mutate } = useSWR<CommentType[]>(
    showReplies ? ['replies', comment._id] : null,
    () => getReplyComment(comment.postId, comment._id)
  );

  const { likes, dislikes, reaction: myreaction, handleReaction } = useReaction(
    'comment',
    comment._id,
    {
      likeCount: comment.likeCount,
      dislikeCount: comment.dislikeCount,
      userReaction: comment.userReaction,
    }
  );

  const handleShowReplies = () => {
    setShowReplies(prev => !prev);
  };

  const handleAddReply = async () => {
    if (!replyText.trim()) return;

    setShowReplies(true);

    const tempReply: CommentType = {
      _id: comment._id,
      content: replyText,
      user: comment.user,
      likeCount: comment.likeCount,
      dislikeCount: comment.dislikeCount,
      createdAt: comment.createdAt,
      parentId: comment._id,
      postId: comment.postId,
      replies: comment.replies,
      userReaction: comment.userReaction
    };

    const optimistic = [tempReply, ...replies];

    try {
      mutate(optimistic, false);

      const response = await $api.post(`api/comment/create`, {
        content: replyText,
        parentId: comment._id,
        postId: comment.postId,  
      });

      console.log(response.data);

      setReplyText('');
      
      setTimeout(() => mutate(), 300);
    } catch (error) {
      console.error(error);
      mutate(); 
    }
  };

  return (
    <div className={classes.commentBody}>
      <img
        className={classes.profilePic}
        src={`${API_URL}/api/user/profile/${comment.user.profilePicture}`}
        alt={`${comment.user.username}`}
      />

      <div className={classes.commentData}>
        <div className={classes.data}>
          <span className={classes.username}>{comment.user.username}</span>
          <span className={classes.createdAt}>{comment.createdAt.slice(0, 10)}</span>
        </div>
        <span className={classes.comment}>{comment.content}</span>

        <div className={classes.reactionArea}>
          <div
            className={ myreaction === 'like' ? classes.likeReaction : classes.commentReaction }
            onClick={() => handleReaction('like')}
          >
            <SILike className={`${classes.icon} ${classes.likeIcon}`} />
            <span>{likes}</span>
          </div>

          <div className={ myreaction === 'dislike' ? classes.dislikeReaction : classes.commentReaction }
            onClick={() => handleReaction('dislike')}
          >
            <SIDislike className={`${classes.icon} ${classes.dislikeIcon}`} />
            <span>{dislikes}</span>
          </div>

          <div className={classes.commentReaction} onClick={handleShowReplies}>
            <GoReply className={`${classes.icon} ${classes.replyIcon}`} />
            <span>{comment.replies}</span>
          </div>
        </div>

        {showReplies && (
          <>
            <textarea
              className={
                replyText.length > 0
                  ? classes.existedComment
                  : classes.replyComment
              }
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder='Write a reply...'
            />

            <div
              className={
                replyText.length > 0
                  ? classes.existedIconArea
                  : classes.iconArea
              }
              onClick={handleAddReply}
            >
              <span className={classes.postComment}>Post</span>
              <IoIosSend className={classes.sendIcon} />
            </div>

            <div>
              {replies.map((reply) => (
                <ReplyItem key={reply._id} reply={reply} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}