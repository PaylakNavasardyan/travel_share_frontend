import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Auth } from '../../../types';
import $api, { API_URL } from '../../../http';
import classes from './AnotherUser.module.css';
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
import { FaVideo as FaVideoIcon } from "react-icons/fa";
import { Post } from '../../../types/post';
import PostActions from '../Posts/PostReactions/PostActions';
import PostModal from '../Posts/ModalPosts/PostModal';

export default function AnotherUser() {
  const GoComment = GoCommentIcon as unknown as React.FC<{className: string}>;
  const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ className: string }>;
  const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ className: string}>;
  const GoDotFill = GoDotFillIcon as unknown as React.FC<{ className: string }>;
  const TbPlayerTrackPrevFilled =TbPlayerTrackPrevFilledIcon as unknown as React.FC<{ className: string }>
  const TbPlayerTrackNextFilled = TbPlayerTrackNextFilledIcon as unknown as React.FC<{ className: string }>
  const FaVideo = FaVideoIcon as unknown as React.FC<{ className: string }>;

  const [posts, setPosts] = useState<Post[]>([])
  const [currentIndex, setCurrentIndex] = useState<{ [key: string]: number }>({});
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPosts, setTotalPosts] = useState<number>(0); 
  const [user, setUser] = useState<Auth.User | null>(null);
  

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await $api.get(`${API_URL}/api/user/${id}`);
        setUser(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) fetchUser();
  }, [id]);

  let profilePic_URL = user?.profilePicture;
  const userProfilePic = `${API_URL}/api/user/profile/${profilePic_URL}`;
  let nameFirtLetter = user?.username[0].toUpperCase();
  
  const selectedPost = posts.find(post => post._id === id);
  
  useEffect(() => {
    if (!user?._id) return;
    
    async function getUserPost() {
      try {
        setLoading(true)
        
        let response = await $api.get(`${API_URL}/api/posts/?page=${page}&sort=new&user_id=${user?._id}&limit=40`);
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
  }, [page, user]);

  useEffect(() => {
    document.body.style.overflow = 'auto';
    
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, [location]);

  if (!user) return <div>Loading...</div>;

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
                src={userProfilePic}
                alt="Profile-Picture"
              />
            ) : (
              <p className={classes.nameLetter}>{nameFirtLetter}</p>
            )}
          </div>

          <p className={`${classes.userData} ${classes.userName}`}>{user?.username}</p>
          
          <div className={classes.fullname}>
            <span className={classes.name}>{user?.name}</span>
            <span className={classes.name}>{user?.surname}</span>
          </div>  

          <div className={classes.follows}>
            <span className={classes.followData}>Followers {user?.followers}</span>
            <span className={classes.followData}>Following {user?.following}</span>
            <span className={classes.postData}>Posts {totalPosts}</span>
          </div>
        </div>  

          <div className={classes.profilePosts}> 
          {posts.map((post) => {
            const index = currentIndex[post._id] ?? 0;
            const safeIndex =
              index >= post.media.length ? 0 : index;

            const currentMedia = post.media[safeIndex];

            const mediaUrl = currentMedia
              ? `${API_URL}/api/posts/media/${currentMedia.url}`
              : '';

            const isVideo =
              currentMedia?.type?.startsWith('video/') ||
              currentMedia?.url.match(/\.(mp4|webm|ogg)$/i);
            return (
              <div key={post._id} className={classes.post}>
                <div className={classes.postInfo}>
                  <span className={classes.postCreateData}>
                    {post.createdAt.slice(0, 10)}
                  </span>
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

                  {post.media.length > 0 && currentMedia && (
                    isVideo ? (
                      <div className={classes.videoWrapper}>
                        <FaVideo className={classes.videoIcon} />

                      <video
                        className={`${classes.postMedia} ${classes.videoPost}`}
                        src={mediaUrl}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/travel-share/post/${post._id}`)
                        }}
                      />
                    </div>
                    ) : (
                      <img
                        className={classes.postMedia}
                        src={mediaUrl}
                        alt="Post Media"
                        onClick={() =>
                          navigate(`/travel-share/post/${post._id}`)
                        }
                      />
                    )
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
    </div>
  );
}