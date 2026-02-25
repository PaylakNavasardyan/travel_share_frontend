type Media = {
    type: string,
    url: string
};

export type Post = {
    createdAt: string,
    _id: string,
    userId: string,
    description: string,
    dislikeCount: number,
    likeCount: number,
    media: Media[]
};
