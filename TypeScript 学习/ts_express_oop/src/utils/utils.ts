import { Request, Response, NextFunction } from 'express'

// 前后端分离，返回值的接口的数据类型
interface Result {
    success: boolean
    msg: string
    data: any
}

export const responseData = (success: boolean, msg: string, data?: any): Result => {
    return {
        success: success,
        msg: msg,
        data: data,
    }
}

// 鉴权中间件
export const login_required = (req: Request, res: Response, next: NextFunction): void => {
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
        next()
    } else {
        // res.redirect('/login')
        res.json(responseData(false, "访问失败，请先登录"))
    }
}