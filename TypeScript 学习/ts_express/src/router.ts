import { Router, Request, Response } from 'express'
import Crowller from './utils/douban_top250'
import Analyzer from './utils/moviesAnalyzer'
import fs from 'fs'
import path from 'path'

// express 库的类型定义文件描述不准确 .d.ts，因此需要自定义
interface BodyRequest extends Request {
    body: {
        [key: string]: string | undefined
    }
}

const router = Router()

router.get('/', (req: BodyRequest, res: Response) => {
    const isLogin = req.session ? req.session.login : undefined
    if (isLogin) {
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
    } else {
        // 登录页面
        res.redirect('/login');
    }

})

router.get('/getData', (req: BodyRequest, res: Response) => {
    const isLogin = req.session ? req.session.login : undefined
    if(isLogin) {
        const analyzer = new Analyzer()
        const crowller = new Crowller(analyzer)
        res.send('getData success!')
    } else {
        res.redirect('/login')
    }
})

router.get('/showData', (req: BodyRequest, res: Response) => {
    const isLogin = req.session ? req.session.login : undefined
    if(isLogin) {
        try {
            const filePath = path.resolve(__dirname, '../data/douban_top250.json')
            const data = fs.readFileSync(filePath, 'utf-8')
            res.json(JSON.parse(data))
        } catch (error) {
            res.send('尚未爬取到内容，请先爬取内容')
        }
    } else {
        res.redirect('/login')
    }
})

router.get('/login', (req: BodyRequest, res: Response) => {
    console.log('login get')
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
        res.redirect('/');
    } else {
        res.send('用户名或密码错误')
    }
})

router.get('/logout', (req: BodyRequest, res: Response) => {
    req.session = undefined
    res.redirect('/login');
})

export default router