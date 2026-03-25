import { useEffect, useState } from 'react';
import classes from './PostContent.module.css';
import { getComment } from '../PostComments/GetComment';
import { CommentType } from '../../../../types/comment';
import { API_URL } from '../../../../http';

interface Props {
  postId: string;
  description: string;
}

export default function PostContent({ postId, description }: Props) {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    async function fetchComments() {
      const data = await getComment(postId);
      setComments(data);
    }

    fetchComments();
  }, [postId]);

  return (
    <div className={classes.section}>
      <div className={classes.description}>
        <span>{description}</span>
      </div>

      <div className={classes.comment}>
        {comments.map((c) => (
          <p key={c._id}>
            <img 
              className={classes.profilePic}
              src={`${API_URL}/api/user/profile/${c.user.profilePicture}`}
              alt="Profile"
            />
            <span>{c.user.username}</span>
            <span>{c.content}</span>
          </p>
        ))}
      </div>
    </div>
  );
}