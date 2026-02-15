import React, { useState, useEffect } from 'react'
import $api, { API_URL } from '../../../http'
import { Post } from '../../../types/post';
import classes from './Post.module.css'
import { SlLike as SILikeIcon, SlDislike as SlDislikeIcon } from "react-icons/sl";
import { GoComment as GoCommentIcon } from "react-icons/go";
import { useUser } from '../../../context/UserContext';

export default function AllPosts() {
  const SILike = SILikeIcon as unknown as React.FC<{className: string}>;
  const SIDislike = SlDislikeIcon as unknown as React.FC<{className: string}>
  const GoComment = GoCommentIcon as unknown as React.FC<{className: string}>

  const [posts, setPosts] = useState<Post[]>([]);
  
  const { user } = useUser();

  useEffect(() => {
    async function postGetter() {
      try {
        let response = await $api.get('/api/posts/?page=1&limit=50&sort=most_like');
        
        setPosts(response.data.data.posts);
      } catch (error) {
        console.log(error)
      }
    };
    
    postGetter();
  }, []);

  return (
    <div className={classes.post}>
      {
        posts.map((post) => (
          <div key={post.id} className={classes.postBody}>
            <p className={classes.username}>@{user?.userName}</p>
            <p className={classes.postDescription}>{post.description}</p>

            {post.media.map((item, index) => (
              <img
                className={classes.postMedia} 
                key={index} 
                src={`${API_URL}/api/posts/media/${item.url}`} 
                alt="Post Media"
              />
            ))}

            <div className={classes.line}></div>

            <div className={classes.postReaction}>
              <div className={`${classes.likeArea} ${classes.area}`}>
                <SILike className={`${classes.like} ${classes.reaction}`} />
                <span className={`${classes.likeCount} ${classes.count}`}>
                  {post.likeCount}
                </span>
              </div>
      
              <div className={`${classes.dislikeArea} ${classes.area}`}>
                <SIDislike className={`${classes.dislike} ${classes.reaction}`} />
                <span className={`${classes.dislikeCount} ${classes.count}`}>
                  {post.dislikeCount}
                </span>
              </div>

              <div className={`${classes.commentArea} ${classes.area}`}>
                <GoComment className={`${classes.comment} ${classes.reaction}`} />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}
