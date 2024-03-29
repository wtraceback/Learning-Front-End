import { Response } from "express";
import { controller, get, post, use } from "../decorator";
import { responseData, login_required } from "../utils/utils";
import { BodyRequest } from "../utils/type";

@controller('/api')
export class LoginController {
    static isLogin(req: BodyRequest): boolean {
        return !!(req.session ? req.session.login : false);
    }

    @get("/isLogin")
    isLogin(req: BodyRequest, res: Response): void {
        const isLogin = LoginController.isLogin(req);
        if (isLogin) {
            res.json(responseData(isLogin, "已经登录", isLogin));
        } else {
            res.json(responseData(isLogin, "未登录，请先登录", isLogin));
        }
    }

    // @get("/")
    // @use(login_required)
    // home(req: BodyRequest, res: Response): void {
    //     // 主页
    //     res.send(`
    //         <!DOCTYPE html>
    //         <html lang="en">
    //         <head>
    //             <meta charset="UTF-8">
    //             <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //             <title>登录页面</title>
    //         </head>
    //         <body>
    //             <a href="/getData">获取数据</a>
    //             <a href="/showData">展示数据</a>
    //             <a href="/logout">退出登录</a>
    //         </body>
    //         </html>
    //     `);
    // }

    // @get("/login")
    // login(req: BodyRequest, res: Response): void {
    //     // 登录页
    //     res.send(`
    //         <!DOCTYPE html>
    //         <html lang="en">
    //         <head>
    //             <meta charset="UTF-8">
    //             <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //             <title>登录页面</title>
    //         </head>
    //         <body>
    //             <form action="/login" method="POST">
    //                 <label>
    //                     用户名：
    //                     <input type="text" name="username" />
    //                 </label><br />
    //                 <label>
    //                     密码：
    //                     <input type="password" name="password" />
    //                 </label><br />
    //                 <input type="submit" value="提交" />
    //             </form>
    //         </body>
    //         </html>
    //     `);
    // }

    @post("/login")
    login_post(req: BodyRequest, res: Response): void {
        const { username, password } = req.body;
        if (username === "admin" && password === "123456" && req.session) {
            req.session.login = true;
            // res.redirect('/');
            res.json(responseData(true, "登录成功"));
        } else {
            // res.send('用户名或密码错误')
            res.json(responseData(false, "用户名或密码错误"));
        }
    }

    @get("/logout")
    logout(req: BodyRequest, res: Response): void {
        req.session = undefined;
        // res.redirect('/login');
        res.json(responseData(true, "退出成功"));
    }
}
