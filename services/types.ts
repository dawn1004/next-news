export interface Article {
    _id?: number;
    slug: string;
    title: string;
    origSizeImgUrl: string;
    thumbSizeImgUrl: string;
    body: string;
    author: string;
    published: Date;
}

export interface CreateArticleBody {
    title: string;
    origSizeImgUrl: string;
    thumbSizeImgUrl: string;
    body: string;
    author: string;
}