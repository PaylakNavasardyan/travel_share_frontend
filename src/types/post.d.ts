type Media = {
    type: string,
    url: string
};

export type Post = {
    id: string,
    userId: string,
    description: string,
    dislikeCount: number,
    likeCount: number,
    media: Media[]
};
