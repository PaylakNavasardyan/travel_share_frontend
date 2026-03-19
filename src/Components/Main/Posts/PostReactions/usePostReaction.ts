import useSWR from 'swr';
import $api from '../../../../http';

interface ReactionState {
  likeCount: number;
  dislikeCount: number;
  userReaction: string | null;
}

export function usePostReaction(postId: string, initialData: ReactionState) {
  const { data, mutate: localMutate } = useSWR<ReactionState>(
    `post-reaction-${postId}`,
    null, 
    { fallbackData: initialData }
  );

  const handleReaction = async (type: string) => {
    const current = data || initialData;
    let newState: ReactionState;

    if (type === 'like') {
      if (current.userReaction === 'like') {
        newState = { ...current, likeCount: current.likeCount - 1, userReaction: null };
      } else if (current.userReaction === 'dislike') {
        newState = { ...current, likeCount: current.likeCount + 1, dislikeCount: current.dislikeCount - 1, userReaction: 'like' };
      } else {
        newState = { ...current, likeCount: current.likeCount + 1, userReaction: 'like' };
      }
    } else {
      if (current.userReaction === 'dislike') {
        newState = { ...current, dislikeCount: current.dislikeCount - 1, userReaction: null };
      } else if (current.userReaction === 'like') {
        newState = { ...current, dislikeCount: current.dislikeCount + 1, likeCount: current.likeCount - 1, userReaction: 'dislike' };
      } else {
        newState = { ...current, dislikeCount: current.dislikeCount + 1, userReaction: 'dislike' };
      }
    }

    localMutate(newState, false);

    try {
      await $api.post(`/api/posts/${postId}/react`, { type });
    } catch (error) {
      localMutate(current, false);
      console.log(error);
    }
  };

  return {
    likes: data?.likeCount ?? initialData.likeCount,
    dislikes: data?.dislikeCount ?? initialData.dislikeCount,
    reaction: data?.userReaction ?? initialData.userReaction,
    handleReaction,
  };
}