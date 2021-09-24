import { Request } from 'express'

// express 库的类型定义文件描述不准确 .d.ts，因此需要自定义
export interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined
    }
}

export enum Methods {
    get = 'get',
    post = 'post'
}