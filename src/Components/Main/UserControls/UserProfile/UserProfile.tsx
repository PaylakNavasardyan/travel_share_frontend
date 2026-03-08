import React, { useState, useEffect }  from 'react';
import classes from './UserProfille.module.css';
import { useUser } from '../../../../context/UserContext';
import $api, { API_URL } from '../../../../http/index';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Post } from '../../../../types/post';
import { SlLike as SILikeIcon, SlDislike as SlDislikeIcon } from "react-icons/sl";
import { 
  GoComment as GoCommentIcon,
  GoChevronRight as GoChevronRightIcon,
  GoChevronLeft as GoChevronLeftIcon,
  GoDotFill as GoDotFillIcon
} from "react-icons/go";
import { 
  TbPlayerTrackPrevFilled as TbPlayerTrackPrevFilledIcon, 
  TbPlayerTrackNextFilled as TbPlayerTrackNextFilledIcon
} from "react-icons/tb";
import { IoMdClose as IoMdCloseIcon } from "react-icons/io";
import { CiTrash as CiTrashIcon} from "react-icons/ci";  


export default function UserProfile() {
  const SILike = SILikeIcon as unknown as React.FC<{className: string}>;
  const SIDislike = SlDislikeIcon as unknown as React.FC<{className: string}>;
  const GoComment = GoCommentIcon as unknown as React.FC<{className: string}>;
  const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ className: string }>;
  const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ className: string}>;
  const GoDotFill = GoDotFillIcon as unknown as React.FC<{ className: string }>;
  const TbPlayerTrackPrevFilled =TbPlayerTrackPrevFilledIcon as unknown as React.FC<{ className: string }>
  const TbPlayerTrackNextFilled = TbPlayerTrackNextFilledIcon as unknown as React.FC<{ className: string }>
  const IoMdClose = IoMdCloseIcon as unknown as React.FC<{ className: string}>;
  const CiTrash = CiTrashIcon as unknown as React.FC<{ className: string }>;

  const [posts, setPosts] = useState<Post[]>([])
  const [currentIndex, setCurrentIndex] = useState<{ [key: string]: number }>({});
  const [selectedIndex, setSelectedIndex] = useState<{ [key: string]: number }>({});
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useUser();

  let isActive = user?.isActive;
  let nameFirtLetter = user?.username[0].toUpperCase();
  let profilePic_URL = user?.profilePicture;
  let profilePic = `${API_URL}/api/user/profile/${profilePic_URL}`;
  
  const selectedPost = posts.find(post => post._id === id);

  const selIndex = selectedPost
    ? selectedIndex[selectedPost._id] ?? 0
    : 0;

  const safeSelIndex =
    selectedPost && selIndex >= selectedPost.media.length
      ? 0
      : selIndex;
 
  useEffect(() => {
    if (!user?._id) return;

    async function getUserPost() {
      try {
        setLoading(true)

        let response = await $api.get(`${API_URL}/api/posts/?page=${page}&sort=new&user_id=${user?._id}&limit=20`);
        setPosts(response.data.data.posts);

        setTotalPages(response.data.data.meta.totalPages);
    
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      } catch(error) {
        console.log(error);
      } finally {
        setLoading(false)
      };

    };
    getUserPost();
  }, [page, user]);

  useEffect(() => {
    if (id) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    };
  }, [id]);

  const nextSlide = (postId: string, mediaLenght: number) => {
    setCurrentIndex(prev => (
      {
      ...prev,
      [postId]: ((prev[postId] ?? 0) + 1) % mediaLenght
      }
    ))
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

  
  const nextModalSlide = (postId: string, mediaLength: number) => {
    setSelectedIndex(prev => {
      const current = prev[postId] ?? 0;

      return {
        ...prev,
        [postId]: (current + 1) % mediaLength
      };
    });
  };

  const prevModalSlide = (postId: string, mediaLength: number) => {
    setSelectedIndex(prev => {
      const current = prev[postId] ?? 0;

      return {
        ...prev,
        [postId]: current === 0 ? mediaLength - 1 : current - 1
      };
    });
  };

  return (
    <div className={classes.profile}>
      <div className={classes.profileBar}>
        <div className={classes.icon}>
          <div
            className={classes.backgroundForIcon}
            onClick={() => navigate(-1)}
          >
            <GoChevronLeft className={classes.goLeftIcon} />
          </div>
        </div>

        <div className={classes.profileInfo}>
          <div className={classes.profileImage}>
            {profilePic_URL ? (
              <img
                className={classes.profilePic}
                src={profilePic}
                alt="Profile-Picture"
              />
            ) : (
              <p className={classes.nameLetter}>{nameFirtLetter}</p>
            )}
          </div>

          <div className={classes.personalInfo}>
            <p className={`${classes.userData} ${classes.userName}`}>
              {user?.username}
            </p>
            <p className={classes.userData}>{user?.email}</p>
            <p className={classes.userData}>{user?.name}</p>
            <p className={classes.userData}>{user?.surname}</p>
          </div>

          {!isActive && (
            <p className={classes.isActiveMessage}>
              Please verify your email to activate your account. We've sent a
              confirmation link to your inbox
            </p>
          )}
        </div>
      </div>

      <div className={classes.profilePosts}>
        {posts.map((post) => {
          const index = currentIndex[post._id] ?? 0;

          const safeIndex =
          index >= post.media.length ? 0 : index;

          return (
            <div key={post._id} className={classes.post}>
              <div className={classes.postInfo}>
                <span className={classes.postCreateData}>{post.createdAt.slice(0, 10)}</span>
                <div className={classes.deletePost}>
                  <CiTrash className={classes.deleteIcon}/>
                  <span className={classes.deleteText}>Delete Post</span>
                </div>
              </div>
              <p className={classes.postDescription}>
                {post.description}
              </p>

              <div
                className={
                  post.media.length > 1
                    ? classes.fewItems
                    : classes.oneItem
                }
              >
                {post.media.length > 1 && (
                  <div
                    className={classes.slideButtonBack}
                    onClick={() =>
                      prevSlide(post._id, post.media.length)
                    }
                  >
                    <GoChevronLeft className={classes.slideButton} />
                  </div>
                )}

                {post.media.length > 0 &&
                  post.media[safeIndex] && (
                    <img
                      className={classes.postMedia}
                      onClick={() =>
                        navigate(`post/${post._id}`)
                      }
                      src={`${API_URL}/api/posts/media/${post.media[safeIndex].url}`}
                      alt="Post Media"
                    />
                  )}

                {post.media.length > 1 && (
                  <div
                    className={classes.slideButtonBack}
                    onClick={() =>
                      nextSlide(post._id, post.media.length)
                    }
                  >
                    <GoChevronRight
                      className={classes.slideButton}
                    />
                  </div>
                )}
              </div>

              {post.media.length > 1 && (
                <div className={classes.dots}>
                  {post.media.map((_, i) => (
                    <GoDotFill
                      key={i}
                      className={
                        i === index
                          ? classes.activeDot
                          : classes.dot
                      }
                    />
                  ))}
                </div>
              )}

              <div className={classes.line}></div>

              <div className={classes.postReaction}>
                <div
                  className={`${classes.likeArea} ${classes.area}`}
                >
                  <SILike
                    className={`${classes.like} ${classes.reaction}`}
                  />
                  <span
                    className={`${classes.likeCount} ${classes.count}`}
                  >
                    {post.likeCount}
                  </span>
                </div>

                <div
                  className={`${classes.dislikeArea} ${classes.area}`}
                >
                  <SIDislike
                    className={`${classes.dislike} ${classes.reaction}`}
                  />
                  <span
                    className={`${classes.dislikeCount} ${classes.count}`}
                  >
                    {post.dislikeCount}
                  </span>
                </div>

                <div
                  className={`${classes.commentArea} ${classes.area}`}
                  onClick={() =>
                    navigate(`post/${post._id}`)
                  }
                >
                  <GoComment
                    className={`${classes.comment} ${classes.reaction}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className={classes.paginationGuide}>
          <button
            className={classes.paginationButton}
            disabled={loading || page <= 1}
            onClick={() => setPage(page - 1)}
          >
            <TbPlayerTrackPrevFilled className={classes.changingPageIcon} />
          </button>

          <button
            className={classes.paginationButton}
            disabled={loading || page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <TbPlayerTrackNextFilled className={classes.changingPageIcon} />
          </button>
        </div>
      </div>
    </div>
  )
}