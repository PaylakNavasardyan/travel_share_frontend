import { SlLike as SILikeIcon, SlDislike as SlDislikeIcon } from "react-icons/sl";
import { usePostReaction } from "./usePostReaction";
import classes from './PostActions.module.css';

interface Props {
  postId: string;
  likeCount: number;
  dislikeCount: number;
  reaction: null | string;
}

export default function PostActions({ postId, likeCount, dislikeCount, reaction }: Props) {
  const SILike = SILikeIcon as unknown as React.FC<{ className: string }>;
  const SIDislike = SlDislikeIcon as unknown as React.FC<{ className: string }>;

  const { likes, dislikes, reaction: myreaction, handleReaction } = usePostReaction(postId, {
    likeCount,
    dislikeCount,
    userReaction: reaction,
  });

  return (
    <div className={classes.postReactionButtons}>
      <div
        className={myreaction === 'like' ? classes.likearea : classes.area}
        onClick={() => handleReaction('like')}
      >
        <SILike className={`${classes.like} ${classes.reaction}`} />
        <span className={`${classes.likeCount} ${classes.count}`}>{likes}</span>
      </div>

      <div
        className={myreaction === 'dislike' ? classes.dislikearea : classes.area}
        onClick={() => handleReaction('dislike')}
      >
        <SIDislike className={`${classes.dislike} ${classes.reaction}`} />
        <span className={`${classes.dislikeCount} ${classes.count}`}>{dislikes}</span>
      </div>
    </div>
  );
}