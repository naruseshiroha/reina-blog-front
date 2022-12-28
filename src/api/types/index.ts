
export interface R<T> {
    code: number;
    msg: string;
    data: T;
}

export interface Page<T> {
    countId: string;
    current: number;
    maxLimit: number;
    optimizeCountSql: boolean;
    orders: Array<string>;
    pages: number;
    records: Array<T>;
    searchCount: number;
    size: number;
    total: number;
}

export interface LoginModule {
    userName: string;
    password: string;
}

export interface RegisterModule {
    telephone: string;
    email: string;
    nickName: string;
    password: string;
    rePassword: string;
    verifyCode: string;
}


export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
}

interface BaseEntity {
    createdAt: Date
    createdBy: number
    updatedAt: Date
    updatedBy: number
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