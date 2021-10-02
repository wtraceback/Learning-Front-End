import express from "express";
import { render_template } from "./utils";

const app = express();
// 利用 Express 中的 express.static 内置中间件函数托管静态文件
app.use(express.static("public"));

app.get("*", (req, res) => {
    res.send(render_template(req));
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
});
