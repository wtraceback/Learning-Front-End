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