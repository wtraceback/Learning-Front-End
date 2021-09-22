import express from 'express'
import cookieSession from 'cookie-session'
import bodyParser from 'body-parser'
import 'reflect-metadata'
import './controller/LoginController'
import './controller/CrowllerController'
import router from './router'

const app = express()

// cookie session 配置项
app.use(
    cookieSession({
        name: 'session',
        keys: ['you can not guess'],

        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
)

// body-parser form 表单的配置
app.use(bodyParser.urlencoded({extended: false}))

// 路由配置项
app.use(router)

app.listen(5000, () => {
    console.log('server is running...')
    console.log('http://localhost:5000')
})