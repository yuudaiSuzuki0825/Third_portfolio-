import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// TopPageをインポート。
import TopPage from "./components/TopPage";
// EditPageをインポート。
// import EditPage from "./components/EditPage";

function App() {
    return (
        <div>
            <Switch>
                <Route path="/" exact component={TopPage} />
                {/* <Route path="/edit/:id" exact component={EditPage} /> */}
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
