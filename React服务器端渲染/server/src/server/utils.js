import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "../Routes";

export const render_template = (store, req, context) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
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

    return `
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
    `
};
