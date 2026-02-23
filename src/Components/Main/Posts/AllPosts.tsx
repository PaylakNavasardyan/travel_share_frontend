import React, { useState, useEffect } from 'react'
import $api, { API_URL } from '../../../http'
import { Post } from '../../../types/post';
import classes from './Post.module.css'
import { SlLike as SILikeIcon, SlDislike as SlDislikeIcon } from "react-icons/sl";
import { 
  GoComment as GoCommentIcon,
  GoChevronRight as GoChevronRightIcon,
  GoChevronLeft as GoChevronLeftIcon,
  GoDotFill as GoDotFillIcon
} from "react-icons/go";
import { useLocation } from 'react-router-dom';

export default function AllPosts() {
  const SILike = SILikeIcon as unknown as React.FC<{className: string}>;
  const SIDislike = SlDislikeIcon as unknown as React.FC<{className: string}>;
  const GoComment = GoCommentIcon as unknown as React.FC<{className: string}>;
  const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ className: string }>;
  const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ className: string}>;
  const GoDotFill = GoDotFillIcon as unknown as React.FC<{ className: string }>;

  const [posts, setPosts] = useState<Post[]>([]);
  const [postername, setPostername] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<{ [key: string]: number }>({});

  const location = useLocation();
  
  useEffect(() => {
    async function postGetter() {
      try {
        let response = await $api.get('/api/posts/?page=1&limit=50&sort=most_like');
        const posts = response.data.data.posts
        setPosts(posts);

        const userIds: string[] = posts.map((post: Post) => post.userId)

        const usersResponse = await Promise.all(
          userIds.map(id => $api.get(`api/user/${id}`))
        );

        const users: string[] = usersResponse.map(res => res.data.data.username);
        setPostername(users);

        fetch(posts);
        
      } catch (error) {
        console.log(error)
      }
    };
    
    postGetter();
  }, [location.state]);
  
  const nextSlide = (postId: string, mediaLenght: number) => {
    setCurrentIndex(prev => (
      {
        ...prev,
        [postId]: ((prev[postId] ?? 0) + 1) % mediaLenght
      }
    ));
  };

  const prevSlide = (postId: string, mediaLenght: number) => {
    setCurrentIndex(prev => (
      {
        ...prev,
        [postId]: (prev[postId] ?? 0) === 0 
          ?
        mediaLenght - 1
          :
        (prev[postId] ?? 0) - 1
      }
    ))
  };
  
  return (
    <div className={classes.post}>
      {posts.map((post, postIndex) => {
        const index = currentIndex[post.id] ?? 0;

        const safeIndex =
        index >= post.media.length ? 0 : index;

        return (
          <div key={post.id} className={classes.postBody}>
            {postername[postIndex] && <p className={classes.username}>@{postername[postIndex]}</p>}
            
            <p className={classes.postDescription}>{post.description}</p>

            <div className={post.media.length > 1 ? classes.fewItems : classes.oneItem}>
              {post.media.length > 1 && (
                <div 
                  className={classes.slideButtonBack}
                  onClick={() => prevSlide(post.id, post.media.length)}
                >
                  <GoChevronLeft className={classes.slideButton} />
                </div>
              )}

              {post.media.length > 0 && post.media[safeIndex] && (
                <img
                  className={classes.postMedia}
                  src={`${API_URL}/api/posts/media/${post.media[safeIndex].url}`}
                  alt="Post Media"
                />
              )}

              {post.media.length > 1 && (
                <div 
                  className={classes.slideButtonBack}
                  onClick={() => nextSlide(post.id, post.media.length)}  
                >
                  <GoChevronRight className={classes.slideButton} />
                </div>
              )}
            </div>

            {post.media.length > 1 && (
              <div className={classes.dots}>
                {post.media.map((_, i) => (
                  <GoDotFill
                    key={i}
                    className={i === index ? classes.activeDot : classes.dot}
                  />
                ))}
              </div>
            )}

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
        );
      })}
    </div>
  );
}
