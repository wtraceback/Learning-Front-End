import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "../Routes";
import getStore from "../store";

const App = () => {
    return (
        <Provider store={getStore()}>
            <BrowserRouter>
                {/* <Routes /> */}
                {/* <Route path="/" exact component={Home}></Route> */}
                {
                    routes.map((route) => {
                        return <Route {...route} />
                    })
                }
            </BrowserRouter>
        </Provider>
    );
};

ReactDOM.hydrate(<App />, document.getElementById("root"));
