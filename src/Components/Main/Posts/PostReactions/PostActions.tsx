import { useState } from "react";
import ReactToPost from "./ReactToPost";
import { SlLike as SILikeIcon, SlDislike as SlDislikeIcon } from "react-icons/sl";
import classes from './PostActions.module.css';

interface Props {
    postId: string;
    likeCount: number;
    dislikeCount: number;
    reaction: null | string;
};

export default function PostActions(
    {
        postId,
        likeCount,
        dislikeCount,
        reaction,
    }: Props) {

    const SILike = SILikeIcon as unknown as React.FC<{className: string}>;
    const SIDislike = SlDislikeIcon as unknown as React.FC<{className: string}>;

    const [likes, setLikes] = useState(likeCount);
    const [dislikes, setDislikes] = useState(dislikeCount);
    const [myreaction, setMyreaction] = useState(reaction);

    const handleReaction = async (type: string) => {
        const handleLikes = (): void => {
            if (myreaction === 'like') {
                setLikes(prev => prev - 1);
                setMyreaction(null);
            }else if (myreaction === 'dislike') {
                setDislikes(prev => prev - 1);
                setLikes(prev => prev + 1);
                setMyreaction('like');
            }else if (myreaction === null) {
                setLikes(prev => prev + 1);
                setMyreaction('like');
            };
        };

        const handleDislikes = (): void => {
            if (myreaction === 'dislike') {
                setDislikes(prev => prev - 1);
                setMyreaction(null);
            }else if (myreaction === 'like') {
                setDislikes(prev => prev + 1);
                setLikes(prev => prev - 1);
                setMyreaction('dislike');
            }else if (myreaction === null) {
                setDislikes(prev => prev + 1);
                setMyreaction('dislike')
            }
        };

        if (type === 'like') handleLikes();
        else if (type === 'dislike') handleDislikes(); 

        try {
            await ReactToPost(postId, type);
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className={classes.postReactionButtons}>
        <div 
            className={myreaction === 'like' ? classes.likearea : classes.area} 
            onClick={() => handleReaction('like')}
        >
            <SILike className={`${classes.like} ${classes.reaction}`} />
            <span className={`${classes.likeCount} ${classes.count}`}>
                {likes}
            </span>
        </div>

        <div 
            className={myreaction === 'dislike' ? classes.dislikearea : classes.area}
            onClick={() => handleReaction('dislike')}    
        >
            <SIDislike className={`${classes.dislike} ${classes.reaction}`} />
            <span className={`${classes.dislikeCount} ${classes.count}`}>
                {dislikes}
            </span>
        </div>
    </div>
  );
}