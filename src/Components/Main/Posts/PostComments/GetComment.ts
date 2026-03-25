import $api from '../../../../http';
import { CommentType } from '../../../../types/comment';

export async function getComment(postId: string): Promise<CommentType[]> {
  try {
    const response = await $api(
      `api/comment/${postId}/?page=1&limit=20&sort=most_like`
    );

    return response.data.data.comments; 
  } catch (error) {
    console.log(error);
    return [];
  }
}