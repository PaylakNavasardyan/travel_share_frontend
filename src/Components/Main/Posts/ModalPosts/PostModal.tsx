import React, { useState } from 'react'
import { 
  GoChevronRight as GoChevronRightIcon,
  GoChevronLeft as GoChevronLeftIcon,
} from "react-icons/go";
import { IoMdClose as IoMdCloseIcon } from "react-icons/io";
import classes from './PostModal.module.css';
import { useNavigate } from 'react-router-dom';
import PostActions from '../PostReactions/PostActions';
import PostComment from '../PostComments/PostComment';

interface PostMedia {
  url: string;
}

interface PostUser {
  username: string;
  profilePicture?: string;
}

interface Post {
  _id: string;
  description: string;
  media: PostMedia[];
  likeCount: number;
  dislikeCount: number;
  userReaction: string | null;
  user: PostUser;
}

interface PostModalProps {
  post: Post;
  apiUrl?: string;
}

export default function PostModal({post, apiUrl = ''}: PostModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  
  const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ className: string }>;
  const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ className: string }>;
  const IoMdClose = IoMdCloseIcon as unknown as React.FC<{ className: string }>;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % post.media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev === 0 ? post.media.length - 1 : prev - 1);
  };

  const safeIndex = currentIndex >= post.media.length ? 0 : currentIndex;

  return (
    <div className={classes.modalOverlay}>
      <div
        className={classes.modalCloseBorder}
        onClick={() => navigate(-1)}
      >
        <IoMdClose className={classes.modalCloseIcon} />
      </div>

      <div className={classes.modalContentBackground}>
        <div
          className={classes.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={post.media.length > 1 ? classes.fewItems : classes.oneItem}>
            {post.media.length > 0 && (
              <img
                className={classes.postMedia}
                src={`${apiUrl}/api/posts/media/${post.media[safeIndex].url}`}
                alt="Post Media"
              />
            )}

            {post.media.length > 1 && (
              <div
                className={`${classes.slideButtonBack} ${classes.left}`}
                onClick={prevSlide}
              >
                <GoChevronLeft className={classes.slideButton} />
              </div>
            )}

            {post.media.length > 1 && (
              <div
                className={`${classes.slideButtonBack} ${classes.right}`}
                onClick={nextSlide}
              >
                <GoChevronRight className={classes.slideButton} />
              </div>
            )}
          </div>

          <div className={classes.modalPostInfo}>
            <div className={classes.modalPostUserData}>
              {post.user.profilePicture ? (
                <img
                  className={classes.profilePic}
                  src={`${apiUrl}/api/user/profile/${post.user.profilePicture}`}
                  alt="Profile-Picture"
                />
              ) : (
                <div className={classes.letter}>
                  <p className={classes.firstletter}>
                    {post.user.username[0].toUpperCase()}
                  </p>
                </div>
              )}

              <span className={classes.username}>@{post.user.username}</span>
            </div>

            <span className={classes.description}>{post.description}</span>
            
            <PostComment />

            <PostActions 
              postId={post._id}
              likeCount={post.likeCount}
              dislikeCount={post.dislikeCount}
              reaction={post.userReaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
