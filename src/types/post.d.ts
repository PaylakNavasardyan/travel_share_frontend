type Media = {
    type: string,
    url: string
};

type User = {
    _id: string,
    username: string,
    profilePicture: string
};

export type Post = {
    createdAt: string,
    _id: string,
    user: User,
    description: string,
    dislikeCount: number,
    likeCount: number,
    media: Media[]
};
