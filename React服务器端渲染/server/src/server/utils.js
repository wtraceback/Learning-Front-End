import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { matchRoutes } from 'react-router-config'
import routes from "../Routes";
import getStore from "../store";

export const render_template = (req) => {
    const store = getStore()

    // 根据路由的路径，往 store 里面加数据
    // 在服务器端渲染之前，把这个路由需要的数据提前加载好
    const matchedRoutes = matchRoutes(routes, req.path)

    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={{}}>
                {/* <Routes /> */}
                {/* <Route path="/" exact component={Home}></Route> */}
                {
                    routes.map((route) => {
                        return <Route {...route} />
                    })
                }
            </StaticRouter>
        </Provider>
    );

    return `
        <!DOCTYPE>
        <html>
            <head></head>
            <body>
                <div id="root">${content}</div>
                <script src="index.js"></script>
            </body>
        </html>
    `;
};
