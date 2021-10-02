import React from "react";
import { Route } from "react-router-dom";

import Home from "./containers/Home";
import Login from "./containers/Login";

const Routes = () => {
    return (
        <div>
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" exact component={Login}></Route>
        </div>
    );
};

export default Routes;
