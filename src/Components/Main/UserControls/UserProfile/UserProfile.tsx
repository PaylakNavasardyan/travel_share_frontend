import React, { useState, useEffect }  from 'react';
import classes from './UserProfile.module.css';
import { useUser } from '../../../../context/UserContext';
import $api, { API_URL } from '../../../../http/index';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Post } from '../../../../types/post';
import { 
  GoComment as GoCommentIcon,
  GoChevronRight as GoChevronRightIcon,
  GoChevronLeft as GoChevronLeftIcon,
  GoDotFill as GoDotFillIcon
} from "react-icons/go";
import { 
  TbPlayerTrackPrevFilled as TbPlayerTrackPrevFilledIcon, 
  TbPlayerTrackNextFilled as TbPlayerTrackNextFilledIcon,
} from "react-icons/tb";
import { CiTrash as CiTrashIcon} from "react-icons/ci";  
import PostActions from '../../Posts/PostReactions/PostActions';
import PostModal from '../../Posts/ModalPosts/PostModal';

export default function UserProfile() {
  const GoComment = GoCommentIcon as unknown as React.FC<{className: string}>;
  const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ className: string }>;
  const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ className: string}>;
  const GoDotFill = GoDotFillIcon as unknown as React.FC<{ className: string }>;
  const TbPlayerTrackPrevFilled =TbPlayerTrackPrevFilledIcon as unknown as React.FC<{ className: string }>
  const TbPlayerTrackNextFilled = TbPlayerTrackNextFilledIcon as unknown as React.FC<{ className: string }>
  const CiTrash = CiTrashIcon as unknown as React.FC<{ className: string }>;

  const [posts, setPosts] = useState<Post[]>([])
  const [currentIndex, setCurrentIndex] = useState<{ [key: string]: number }>({});
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useUser();

  let isActive = user?.isActive;
  let nameFirtLetter = user?.username[0].toUpperCase();
  let profilePic_URL = user?.profilePicture;
  let profilePic = `${API_URL}/api/user/profile/${profilePic_URL}`;
  
  const selectedPost = posts.find(post => post._id === id);

  useEffect(() => {
    if (!user?._id) return;

    async function getUserPost() {
      try {
        setLoading(true)

        let response = await $api.get(`${API_URL}/api/posts/?page=${page}&sort=new&user_id=${user?._id}&limit=20`);
        setPosts(response.data.data.posts);
        setTotalPages(response.data.data.meta.totalPages);
        setTotalPosts(response.data.data.meta.totalPosts);
        
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
  }, [page, user, location]);
  
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
            <p className={classes.userPostData}>You have {totalPosts} posts</p>
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
          const safeIndex = index >= post.media.length ? 0 : index;

          return (
            <div key={post._id} className={classes.post}>
              <div className={classes.postInfo}>
                <span className={classes.postCreateData}>
                  {post.createdAt.slice(0, 10)}
                </span>

                <div className={classes.deletePost}>
                  <Link
                    className={classes.deleteLink}
                    to="/delete-post"
                    state={{
                      backgroundLocation: location,
                      postId: post._id
                    }}
                  >
                    <CiTrash className={classes.deleteIcon} />
                    <span className={classes.deleteText}>Delete Post</span>
                  </Link>
                </div>
              </div>

              <p className={classes.postDescription}>{post.description}</p>

              <div className={post.media.length > 1 ? classes.fewItems : classes.oneItem}>
                {post.media.length > 1 && (
                  <div
                    className={classes.slideButtonBack}
                    onClick={() => prevSlide(post._id, post.media.length)}
                  >
                    <GoChevronLeft className={classes.slideButton} />
                  </div>
                )}

                {post.media.length > 0 && post.media[safeIndex] && (
                  <img
                    className={classes.postMedia}
                    onClick={() => navigate(`/travel-share/post/${post._id}`)}
                    src={`${API_URL}/api/posts/media/${post.media[safeIndex].url}`}
                    alt="Post Media"
                  />
                )}

                {post.media.length > 1 && (
                  <div
                    className={classes.slideButtonBack}
                    onClick={() => nextSlide(post._id, post.media.length)}
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
                <PostActions 
                  postId={post._id}
                  likeCount={post.likeCount}
                  dislikeCount={post.dislikeCount}
                  reaction={post.userReaction}
                />

                <div
                  className={`${classes.commentArea} ${classes.area}`}
                  onClick={() => navigate(`post/${post._id}`)}
                >
                  <GoComment className={`${classes.comment} ${classes.reaction}`} />
                </div>
              </div>
            </div>
          );
        })   
        
      } 

      {posts.length > 0 ? (
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
        ) : (
          <p className={classes.nopostText}
            style={{
              fontSize: '20px', 
              color: '#4848A0FF', 
              fontFamily: 'poppins-semiBold',
              marginTop: '100px'
            }}
          >No posts yet</p>
        )}
    </div>

    {selectedPost && (
      <PostModal
        post={selectedPost}
        apiUrl={API_URL}
      />
    )}
    </div> 
  )
}