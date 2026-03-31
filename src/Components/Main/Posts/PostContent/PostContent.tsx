import classes from './PostContent.module.css';
import { getComment } from '../PostComments/GetComment';
import { CommentType } from '../../../../types/comment';
import useSWR from 'swr';
import CommentItem from './CommentItem';

interface Props {
  postId: string;
  description: string;
  likeCount: number;
  dislikeCount: number;
  reaction: null | string;
};

export default function PostContent({ postId, description }: Props) {
  const { data: comments = [] } = useSWR<CommentType[]>(
    postId ? ['comments', postId] : null,
    () => getComment(postId)
  );

  return (
    <div className={classes.section}>
      <div className={classes.description}>
        <span>{description}</span>
      </div>

      <div className={classes.comment}>
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}