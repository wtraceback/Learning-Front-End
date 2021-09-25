import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./Pages/Login";
import HomePage from "./Pages/Home";

const App: React.FC = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <Route exact path="/login" component={LoginPage}></Route>
            </Switch>
        </HashRouter>
    );
};

export default App;
