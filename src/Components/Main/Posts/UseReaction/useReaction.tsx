import useSWR from 'swr';
import $api from '../../../../http';

type ReactionType = 'post' | 'comment';

interface ReactionState {
  likeCount: number;
  dislikeCount: number;
  userReaction: string | null;
}

export function useReaction(
  type: ReactionType,
  id: string,
  initialData: ReactionState
) {
  const swrKey = `${type}-reaction-${id}`;
  const apiEndpoint = type === 'post' 
    ? `/api/posts/${id}/react` 
    : `/api/comment/${id}/react`;

  const { data, mutate: localMutate } = useSWR<ReactionState>(
    swrKey,
    null,
    { fallbackData: initialData }
  );

  const handleReaction = async (reactionType: 'like' | 'dislike') => {
    const current = data || initialData;
    let newState: ReactionState;

    if (reactionType === 'like') {
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
      await $api.post(apiEndpoint, { type: reactionType });
    } catch (error) {
      localMutate(current, false);
      console.error(error);
    }
  };

  return {
    likes: data?.likeCount ?? initialData.likeCount,
    dislikes: data?.dislikeCount ?? initialData.dislikeCount,
    reaction: data?.userReaction ?? initialData.userReaction,
    handleReaction,
  };
}