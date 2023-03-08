
export interface R<T> {
    code: number;
    msg: string;
    data: T;
}

export interface Page<T> {
    total: string;
    list: T[];
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    pages: number;
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatePageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
}

export interface IPageQuery {
    pageNum: number;
    pageSize: number;
}

export interface UserLoginBO {
    username: string;
    password: string;
}

export interface UserRegisterBO {
    telephone: string;
    email: string;
    nickName: string;
    password: string;
    rePassword: string;
    verifyCode: string;
}


export interface UserVO {
    id: string;
    email: string;
    telephone: string;
    nickName: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    gender?: string;
    signature?: string;
    role?: string;
}

export interface UserCollect {
    id?: string;
    userId: string;
    articleId: string;
    title: string;
    enabled?: boolean;
    checked?: boolean;
    createdAt?: string;
}

interface BaseEntity {
    createdAt: Date
    createdBy: number
    updatedAt: Date
    updatedBy: number
}

export interface Category extends BaseEntity {
    id: string;
    categoryName: string;
    categoryDesc: string;
    status: boolean;
    count: number;
}

export interface CategoryVO {
    id: string;
    categoryName: string;
    categoryDesc: string;
    count: number;
}

export interface Tag extends BaseEntity {
    id: string;
    tagName: string;
    tagDesc: string;
    status: boolean;
    count: number;
}

export interface TagVO {
    id: string;
    tagName: string;
    tagDesc: string;
    count: number;
    checked: boolean;
}

export interface Link extends BaseEntity {
    id: string;
    linkName: string;
    linkDesc: string;
    linkUrl: string;
    status: string;
    delFlag: boolean;
}

export interface LinkVO {
    id: string;
    linkName: string;
    linkDesc: string;
    linkUrl: string;
}

export interface ArticleVO {
    id: string;
    title: string;
    description: string;
    content: string;
    coverImage: string;
    top?: boolean;
    createdAt: string;
    viewCount: number;
    likeCount: number;
    commentCount: number;
    user: UserVO;
    tags: TagVO[];
    category: CategoryVO;
}

export interface CommentVO {
    id: string;
    userId: string;
    nickName: string;
    articleId: string;
    content: string;
    replyUserId: string;
    replyNickName: string;
    status?: string;
    parentId: string;
    createdAt: string;
    children?: CommentVO[];
    avatar: string;
    collapsed?: boolean;
}

export interface CommentBO {
    userId: string;
    nickName: string;
    articleId: string;
    content: string;
    parentId?: string;
    replyUserId?: string;
    replyNickName?: string;
}