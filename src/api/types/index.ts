import { Gender, Role, UserStatus } from "./enums";

export interface R<T> {
    code: number;
    msg: string;
    data: T;
}

export interface IArticleQueryParam {
    key: string | null;
    tagIds: string  | null;
    categoryId: string | null;
    top?: string | null;
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

export interface ResetPasswordBO {
    email: string;
    code: string;
    password: string;
    rePassword?: string;
}

export interface IUserQueryBO {
    email: string | undefined | null; 
    telephone: string | undefined | null;
    nickName: string | undefined | null;
    gender: Gender | undefined | null;
    role: Role | undefined | null;
    froze: UserStatus | undefined | null;
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
    status: string;
}

export interface Tag extends BaseEntity {
    id: string;
    tagId: string;
    tagName: string;
    tagDesc: string;
    status: boolean;
    count: number;
}

export interface TagVO {
    id?: string;
    tagId: string;
    tagName: string;
    tagDesc?: string;
    status?: string;
    count?: number;
    checked?: boolean;
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
    status?: string;
}

export interface LinkBO {
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
    status?: string;
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
    updatedAt: string;
    children?: CommentVO[];
    avatar: string;
    collapsed?: boolean;
}

export interface CommentBO {
    status?: string;
    userId: string;
    nickName: string;
    articleId: string;
    content: string;
    parentId?: string;
    replyUserId?: string;
    replyNickName?: string;
}

export interface IBulletinVO {
    id?: string | null;
    bulTitle: string | null;
    bulContent: string | null;
    status?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
}