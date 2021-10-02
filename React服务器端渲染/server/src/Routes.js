import React from "react";
import { Route } from "react-router-dom";

import Home from "./containers/Home";

const Routes = () => {
    return (
        <div>
            <Route path="/" exact component={Home}></Route>
        </div>
    );
};

export default Routes;
