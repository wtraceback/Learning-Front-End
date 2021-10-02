import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Routes from "../Routes";

const app = express();
// 利用 Express 中的 express.static 内置中间件函数托管静态文件
app.use(express.static("public"));

app.get("/", (req, res) => {
    const content = renderToString(
        <StaticRouter location={req.path} context={{}}>
            <Routes></Routes>
        </StaticRouter>
    );

    res.send(`
        <!DOCTYPE>
        <html>
            <head></head>
            <body>
                <div id="root">${content}</div>
                <script src="index.js"></script>
            </body>
        </html>
    `);
});

app.get("/origin", (req, res) => {
    res.send(`/origin Hello World`);
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
});
