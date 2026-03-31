import classes from './PostContent.module.css';
import { CommentType } from '../../../../types/comment';
import { API_URL } from '../../../../http';
import { SlLike as SILikeIcon, SlDislike as SlDislikeIcon } from "react-icons/sl";
import { GoReply as GoReplyIcon } from "react-icons/go";
import { useReaction } from '../UseReaction/useReaction';

interface CommentItemProps {
  comment: CommentType;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const SILike = SILikeIcon as unknown as React.FC<{ className: string }>;
  const SIDislike = SlDislikeIcon as unknown as React.FC<{ className: string }>;
  const GoReply = GoReplyIcon as unknown as React.FC<{ className: string }>;

  const { likes, dislikes, reaction: myreaction, handleReaction } = useReaction('comment', comment._id, {
    likeCount: comment.likeCount,
    dislikeCount: comment.dislikeCount,
    userReaction: comment.userReaction,
  });

  return (
    <div className={classes.commentBody}>
      <img 
        className={classes.profilePic}
        src={`${API_URL}/api/user/profile/${comment.user.profilePicture}`}
        alt={`${comment.user.username}'s profile`}
      />

      <div className={classes.commentData}>
        <span className={classes.username}>{comment.user.username}</span>
        <span className={classes.comment}>{comment.content}</span>

        <div className={classes.reactionArea}>
          <div 
            className={myreaction === 'like' ? classes.likeReaction : classes.commentReaction} 
            onClick={() => handleReaction('like')}
          >
            <SILike className={`${classes.icon} ${classes.likeIcon}`}/>
            <span>{likes}</span>
          </div>

          <div 
            className={myreaction === 'dislike' ? classes.dislikeReaction : classes.commentReaction} 
            onClick={() => handleReaction('dislike')}
          >
            <SIDislike className={`${classes.icon} ${classes.dislikeIcon}`} />
            <span>{dislikes}</span>
          </div>

          <div className={classes.commentReaction}>
            <GoReply className={`${classes.icon} ${classes.replyIcon}`} />
            {comment.replies > 0 
              ? <span>{comment.replies}</span>
              : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}