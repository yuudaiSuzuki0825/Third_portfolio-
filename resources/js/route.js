import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
// TopPageをインポート。
import TopPage from "./components/TopPage";
import { NotFound } from "./components/NotFound";

function App() {
    return (
        <div className="container">
            <Link to="/" className="appTitle">
                todoApp
            </Link>
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
