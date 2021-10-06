import express from "express";
import { render_template } from "./utils";
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy'
import { getStore } from "../store";
import routes from "../Routes";

const app = express();
// 利用 Express 中的 express.static 内置中间件函数托管静态文件
app.use(express.static("public"));

// /api 请求路径的都需要进行代理转发
app.use('/api', proxy('http://localhost:5000', {
    proxyReqPathResolver: function (req) {
        return '/ssr/api' + req.url
    }
}));

app.get("*", (req, res) => {
    const store = getStore(req)

    // 根据路由的路径，往 store 里面加数据
    // 在服务器端渲染之前，把这个路由需要的数据提前加载好
    // 使用 react-router-config 来配置文件集中式管理路由
    // 使得访问路径 req.path 对应着 routes 中需要加载的组件
    const matchedRoutes = matchRoutes(routes, req.path)
    console.log(matchedRoutes)

    // 让 matchRoutes 里面所有的组件，对应的 loadData 方法执行一次
    var promises = []
    matchedRoutes.forEach((item) => {
        if (item.route.loadData) {
            // item.route.loadData(store) 执行后，返回的是一个 Promise 对象
            item.route.loadData.forEach((fn) => {
                promises.push(fn(store))
            })
        }
    })

    // 等待 promises 数组里面的所有 Promise 执行成功之后，再往下执行
    Promise.all(promises).then(() => {
        const context = {}
        const html = render_template(store, req, context)

        if (context.NOT_FOUND) {
            res.status(404)
            res.send(html)
        } else {
            res.send(html)
        }
    })
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
});
