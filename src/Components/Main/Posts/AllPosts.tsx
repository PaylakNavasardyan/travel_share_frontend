import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import $api, { API_URL } from '../../../http'
import { Post } from '../../../types/post';
import classes from './Post.module.css';
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

export default function AllPosts() {
  const SILike = SILikeIcon as unknown as React.FC<{className: string}>;
  const SIDislike = SlDislikeIcon as unknown as React.FC<{className: string}>;
  const GoComment = GoCommentIcon as unknown as React.FC<{className: string}>;
  const GoChevronRight = GoChevronRightIcon as unknown as React.FC<{ className: string }>;
  const GoChevronLeft = GoChevronLeftIcon as unknown as React.FC<{ className: string}>;
  const GoDotFill = GoDotFillIcon as unknown as React.FC<{ className: string }>;
  const TbPlayerTrackPrevFilled =TbPlayerTrackPrevFilledIcon as unknown as React.FC<{ className: string }>
  const TbPlayerTrackNextFilled = TbPlayerTrackNextFilledIcon as unknown as React.FC<{ className: string }>
  const IoMdClose = IoMdCloseIcon as unknown as React.FC<{ className: string}>;

  const [posts, setPosts] = useState<Post[]>([]);
  const [postername, setPostername] = useState<string[]>([]);
  const [posterImage, setPosterImage] = useState<string[]>([]);
  const [firstLetter, setFirstLetter] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<{ [key: string]: number }>({});
  const [selectedIndex, setSelectedIndex] = useState<{ [key: string]: number }>({});
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedPost = posts.find(post => post._id === id);

  const selIndex = selectedPost
    ? selectedIndex[selectedPost._id] ?? 0
    : 0;

  const safeSelIndex =
    selectedPost && selIndex >= selectedPost.media.length
      ? 0
      : selIndex;
  
  useEffect(() => {
    async function postGetter() {
      try {
        setLoading(true);

        let response = await $api.get(`/api/posts/?page=${page}&limit=20&sort=most_like`);
        const posts = response.data.data.posts;

        setPosts(posts);
        setTotalPages(response.data.data.meta.totalPages);

        const users: string[] = posts.map((post: Post) => post.user.username); 
        setPostername(users);

        const letter = users.map(user => user.slice(0, 1).toUpperCase());
        setFirstLetter(letter);
        
        const images: string[] = posts.map(
          (post: Post) => `${API_URL}/api/user/profile/${post.user.profilePicture}`
        );
        setPosterImage(images);
        
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        fetch(posts);
        
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
    
    postGetter();
  }, [page]);

  useEffect(() => {
    if (id) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'
    };
  }, [id]);  
  
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
    <div className={classes.post}>
      {posts.map((post, postIndex) => {
        const index = currentIndex[post._id] ?? 0;

        const safeIndex =
        index >= post.media.length ? 0 : index;

        return (
          <div key={post._id} className={classes.postBody}>
            <div className={classes.postInfo}>
              <div className={classes.posterInfo}>
                {post.user.profilePicture
                  ?
                    (posterImage[postIndex] &&                      
                      <img 
                        className={classes.profilePic}
                        src={posterImage[postIndex]}
                        alt='Profile-Picture'
                      />
                    )
                  :
                    <div className={classes.letter}>
                      <p className={classes.firstletter}>{firstLetter[postIndex]}</p>
                    </div>
                }

                {postername[postIndex] && <span className={classes.username}>@{postername[postIndex]}</span>}
              </div>

              <span className={classes.postCreateData}>{post.createdAt.slice(0, 10)}</span>
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
                  onClick={() => navigate(`post/${post._id}`)}
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

              <div 
                className={`${classes.commentArea} ${classes.area}`}
                onClick={() => navigate(`post/${post._id}`)}
              >
                <GoComment className={`${classes.comment} ${classes.reaction}`} />
              </div>
            </div>
          </div>
        );
      })}

      {selectedPost && (
        <div className={classes.modalOverlay}>
          <div
            className={classes.modalCloseBorder}
            onClick={() => navigate(-1)}
          >
            <IoMdClose className={classes.modalCloseIcon}/>
          </div>

          <div className={classes.modalContentBackground}>
            <div
              className={classes.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              
              <div className={selectedPost.media.length > 1 ? classes.fewItems : classes.oneItem}>

                {selectedPost && selectedPost.media.length > 0 && (
                  <img
                    className={classes.postMedia}
                    src={`${API_URL}/api/posts/media/${selectedPost.media[safeSelIndex].url}`}
                    alt="Post Media"
                  />
                )}

                {selectedPost.media.length > 1 && (
                  <div
                    className={`${classes.slideButtonBack} ${classes.left}`}
                    onClick={() =>
                      prevModalSlide(selectedPost._id, selectedPost.media.length)
                    }
                  >
                    <GoChevronLeft className={classes.slideButton} />
                  </div>
                )}

                {selectedPost.media.length > 1 && (
                  <div
                    className={`${classes.slideButtonBack} ${classes.right}`}
                    onClick={() =>
                      nextModalSlide(selectedPost._id, selectedPost.media.length)
                    }
                  >
                    <GoChevronRight className={classes.slideButton} />
                  </div>
                )}

              </div>
  
              <div className={classes.modalPostInfo}>
                <div className={classes.modalPostUserData}>
                  {selectedPost.user.profilePicture ? (
                    <img
                      className={classes.profilePic}
                      src={`${API_URL}/api/user/profile/${selectedPost.user.profilePicture}`}
                      alt="Profile-Picture"
                    />
                  ) : (
                    <>
                      <div className={classes.letter}>
                        <p className={classes.firstletter}>
                          {selectedPost.user.username[0].toUpperCase()}
                        </p>
                      </div>
                    </>
                  )}

                  <span className={classes.username}>@{selectedPost.user.username}</span>
                </div>
                  <span className={classes.description}>{selectedPost.description}</span>
              </div>
            </div>
          </div>
        </div>
      )}    

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
  );
}
