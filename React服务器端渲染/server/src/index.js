import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "./containers/Home";

const app = express();

app.get("/", (req, res) => {
    res.send(renderToString(<Home />));
});

app.get("/origin", (req, res) => {
    res.send(`/origin Hello World`);
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
});
