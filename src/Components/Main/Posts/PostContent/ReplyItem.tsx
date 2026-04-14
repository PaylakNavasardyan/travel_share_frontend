import React from 'react'
import { CommentType } from '../../../../types/comment';
import { useReaction } from '../UseReaction/useReaction';
import classes from './PostContent.module.css';
import { SlLike as SILikeIcon, SlDislike as SlDislikeIcon } from "react-icons/sl";

export default function ReplyItem({ reply }: { reply: CommentType }) {
    const SILike = SILikeIcon as unknown as React.FC<{ className: string }>;
    const SIDislike = SlDislikeIcon as unknown as React.FC<{ className: string }>;

    const { likes, dislikes, reaction, handleReaction } = useReaction(
        'comment',
        reply._id,
        {
            likeCount: reply.likeCount,
            dislikeCount: reply.dislikeCount,
            userReaction: reply.userReaction,
        }
    );

  return (
    <div className={classes.replyItem}>
       <div key={reply._id} className={classes.replyItem}>
            <div className={classes.replyData}>
                <div className={classes.replyUserData}>
                    <img 
                        className={classes.replyProfilePicture}
                        src={reply.user.profilePicture}
                        alt='profile-pic'
                    />
                    <span className={classes.replyName}>{reply.user.username}</span>
                </div>

                <span className={classes.replyCreatedAt}>{reply.createdAt.slice(0, 10)}</span>

            </div>

            <span className={classes.replyContent}>{reply.content}</span>

            <div className={classes.replyReactionArea}>
                <div
                    className={ reaction === 'like' ? classes.replyLikeReaction : classes.replyCommentReaction }
                    onClick={() => handleReaction('like')}
                >
                    <SILike className={`${classes.icon} ${classes.likeIcon}`} />
                    <span>{likes}</span>
                </div>

                <div className={ reaction === 'dislike' ? classes.replyDislikeReaction : classes.replyCommentReaction }
                    onClick={() => handleReaction('dislike')}
                >
                    <SIDislike className={`${classes.icon} ${classes.dislikeIcon}`} />
                    <span>{dislikes}</span>
                </div>
            </div>
        </div>
    </div>
  );
}