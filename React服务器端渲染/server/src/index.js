const express = require("express");
const app = express();
const Home = require("./containers/Home");

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
});
