import React, { useContext, useState } from 'react'
import { 
  GoChevronRight as GoChevronRightIcon,
  GoChevronLeft as GoChevronLeftIcon,
} from "react-icons/go";
import { IoMdClose as IoMdCloseIcon } from "react-icons/io";
import classes from './PostModal.module.css';
import { useNavigate } from 'react-router-dom';
import PostActions from '../PostReactions/PostActions';
import PostComment from '../PostComments/PostComment';
import PostContent from '../PostContent/PostContent';
import { CommentType } from '../../../../types/comment';
import { Post } from '../../../../types/post';
import { useUser } from '../../../../context/UserContext';

interface PostModalProps {
  post: Post;
  apiUrl?: string;
};

export default function PostModal({post, apiUrl = ''}: PostModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState<CommentType[]>([]);
  const navigate = useNavigate();
  const { user } = useUser();
  
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

  const navigateToUserProfile = () => {
    if (post.user && post.user._id === user?._id)
      navigate(`/my-profile`);
    else
      navigate(`/user/${post.user._id}`);
  }

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
        {(() => {
          const currentMedia = post.media[safeIndex];

          const mediaUrl = currentMedia
            ? `${apiUrl}/api/posts/media/${currentMedia.url}`
            : '';

          const isVideo =
            currentMedia?.type?.startsWith('video/') ||
            currentMedia?.url.match(/\.(mp4|webm|ogg)$/i);

          return (
            <div
              className={
                post.media.length > 1
                  ? classes.fewItems
                  : classes.oneItem
              }
            >
              {post.media.length > 0 && currentMedia && (
                isVideo ? (
                  <video
                    className={classes.postMedia}
                    src={mediaUrl}
                    controls
                    autoPlay
                    controlsList="nodownload nofullscreen noremoteplayback"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <img
                    className={classes.postMedia}
                    src={mediaUrl}
                    alt="Post Media"
                  />
                )
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
          );
        })()}

        <div className={classes.modalPostInfo}>
          <div className={classes.modalPostUserData}>
            {post.user.profilePicture ? (
              <img
                className={classes.profilePic}
                src={`${apiUrl}/api/user/profile/${post.user.profilePicture}`}
                alt="Profile-Picture"
                onClick= {navigateToUserProfile}
              />
            ) : (
              <div className={classes.letter}
                onClick= {navigateToUserProfile}
              >
                <p className={classes.firstletter}>
                  {post.user.username[0].toUpperCase()}
                </p>
              </div>
            )}

            <span className={classes.username}
              onClick= {navigateToUserProfile}
            >
              @{post.user.username}
            </span>
          </div>

          <PostContent
            postId={post._id}
            description={post.description}
            likeCount={post.likeCount}
            dislikeCount={post.dislikeCount}
            reaction={post.userReaction}
          />

          <PostComment
            postId={post._id}
            onAddComment={(newComment) => {
              setComments(prev => [...prev, newComment]);
            }}
          />

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
