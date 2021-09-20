import { Router, Request, Response, NextFunction } from 'express'
import fs from 'fs'
import path from 'path'

import Crowller from './utils/douban_top250'
import Analyzer from './utils/moviesAnalyzer'
import { responseData } from './utils/utils'

// express 库的类型定义文件描述不准确 .d.ts，因此需要自定义
interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined
    }
}

// 鉴权中间件
const login_required = (req: Request, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
        next()
    } else {
        // res.redirect('/login')
        res.json(responseData(false, "访问失败，请先登录"))
    }
}

const router = Router()

router.get('/', login_required, (req: BodyRequest, res: Response) => {
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
})

router.get('/getData', login_required, (req: BodyRequest, res: Response) => {
    const analyzer = new Analyzer()
    const crowller = new Crowller(analyzer)
    // res.send('getData success!')
    res.json(responseData(true, "数据爬取成功"))
})

router.get('/showData', login_required, (req: BodyRequest, res: Response) => {
    try {
        const filePath = path.resolve(__dirname, '../data/douban_top250.json')
        const data = fs.readFileSync(filePath, 'utf-8')
        res.json(responseData(true, "数据获取成功", JSON.parse(data)))
    } catch (error) {
        // res.send('尚未爬取到内容，请先爬取内容')
        res.json(responseData(false, "尚未爬取到内容，请先爬取内容"))
    }
})

router.get('/login', (req: BodyRequest, res: Response) => {
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
})

router.post('/login', (req: BodyRequest, res: Response) => {
    const { username, password } = req.body
    console.log('login post')
    if (username === 'admin' && password === '123456'  && req.session) {
        req.session.login = true
        // res.redirect('/');
        res.json(responseData(true, "登录成功"))
    } else {
        // res.send('用户名或密码错误')
        res.json(responseData(false, "用户名或密码错误"))
    }
})

router.get('/logout', (req: BodyRequest, res: Response) => {
    req.session = undefined
    // res.redirect('/login');
    res.json(responseData(true, "退出成功"))
})

export default router