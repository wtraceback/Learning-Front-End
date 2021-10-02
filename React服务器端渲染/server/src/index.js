import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "./containers/Home";

const app = express();
// 利用 Express 中的 express.static 内置中间件函数托管静态文件
app.use(express.static("public"));

const content = renderToString(<Home />);

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE>
        <html>
            <head></head>
            <body>
                <div id="root">${content}</div>
                <script src="test.js"></script>
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
