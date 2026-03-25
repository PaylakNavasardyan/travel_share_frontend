type User = {
    _id: string;
    username: string;
    profilePicture: string
};

export type CommentType = {
    _id: string;
    postId: string;
    user: User;
    content: string;
    likeCount: number;
    dislikeCount: number;
    replies: number;
    createdAt: string
}