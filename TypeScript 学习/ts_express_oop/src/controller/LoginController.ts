import 'reflect-metadata'
import { Request, Response } from 'express'
import { controller, get } from './decorator'

// express 库的类型定义文件描述不准确 .d.ts，因此需要自定义
interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined
    }
}

@controller
class LoginController {
    @get('/')
    home(req: BodyRequest, res: Response) {
        // 主页
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>登录页面</title>
            </head>
            <body>
                <a href="/getData">获取数据</a>
                <a href="/showData">展示数据</a>
                <a href="/logout">退出登录</a>
            </body>
            </html>
        `)
    }

    @get('/login')
    login(req: BodyRequest, res: Response) {
        // 登录页
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>登录页面</title>
            </head>
            <body>
                <form action="/login" method="POST">
                    <label>
                        用户名：
                        <input type="text" name="username" />
                    </label><br />
                    <label>
                        密码：
                        <input type="password" name="password" />
                    </label><br />
                    <input type="submit" value="提交" />
                </form>
            </body>
            </html>
        `)
    }
}