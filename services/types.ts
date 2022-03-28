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

export interface ArticleParams {
    page?: number;
    pageSize?: number;
    search?: string;
}

export interface CreateArticleBody {
    title: string;
    origSizeImgUrl: string;
    thumbSizeImgUrl: string;
    body: string;
    author: string;
}

export interface UpdateArticleBody {
    title: string;
    body: string;
    author: string;
}