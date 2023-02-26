import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// TopPageをインポート。
import TopPage from "./components/TopPage";
import { NotFound } from "./components/NotFound";

function App() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={TopPage} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("app")
);
