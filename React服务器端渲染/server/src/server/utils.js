import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { matchRoutes } from 'react-router-config'
import routes from "../Routes";
import { getStore } from "../store";

export const render_template = (req, res) => {
    const store = getStore()

    // 根据路由的路径，往 store 里面加数据
    // 在服务器端渲染之前，把这个路由需要的数据提前加载好
    // 使用 react-router-config 来配置文件集中式管理路由
    // 使得访问路径 req.path 对应着 routes 中需要加载的组件
    const matchedRoutes = matchRoutes(routes, req.path)

    // 让 matchRoutes 里面所有的组件，对应的 loadData 方法执行一次
    var promises = []
    matchedRoutes.forEach((item) => {
        if (item.route.loadData) {
            // item.route.loadData(store) 执行后，返回的是一个 Promise 对象
            promises.push(item.route.loadData(store))
        }
    })

    // 等待 promises 数组里面的所有 Promise 执行成功之后，再往下执行
    Promise.all(promises).then(() => {
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.path} context={{}}>
                    <Switch>
                        {/* <Routes /> */}
                        {/* <Route path="/" exact component={Home}></Route> */}
                        {
                            routes.map((route) => {
                                return <Route {...route} />
                            })
                        }
                    </Switch>
                </StaticRouter>
            </Provider>
        );

        res.send(`
            <!DOCTYPE>
            <html>
                <head></head>
                <body>
                    <div id="root">${content}</div>
                    <script>
                        window.context = {
                            state: ${JSON.stringify(store.getState())}
                        }
                    </script>
                    <script src="index.js"></script>
                </body>
            </html>
        `)
    })
};
