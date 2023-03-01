// React及びReact-DOMライブラリをインポートするため。
// ReactとReactDomライブラリをインポートするため。
import React from "react";
import ReactDOM from "react-dom";
// ルーティングを指定するため（react-router-domからインポートしている）。
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
// TopPageをインポート。
import TopPage from "./components/TopPage";
// NotFoundをインポート。
import NotFound from "./components/NotFound";

// Appコンポーネント。
function App() {
    return (
        <div className="container">
            {/* ページタイトルをトップページへ移動するリンクにしている。これは誤ってNotFoundページに飛んでしまったときに前ページへ戻る際，使用してもらうため。 */}
            <header>
                <Link to="/" className="appTitle">
                    todoApp
                </Link>
            </header>
            <main>
                <Switch>
                    {/* トップページにアクセスするとTopPageコンポーネントが表示される。 */}
                    <Route path="/" exact component={TopPage} />
                    {/* urlが「/」以外のものを入力した際には以下のコンポーネントが表示される。 */}
                    <Route component={NotFound} />
                </Switch>
            </main>
        </div>
    );
}

// ここでReactDomライブラリを使用。このファイル以外でもう以下のような記述は不要なので別ファイルではReactDomライブラリをインポートする必要がない。
ReactDOM.render(
    // ルーティングの記載において，まずはSwitchやLink, Routeの親要素としてBrowserRouterタグを記述する必要がある。Appコンポーネント内にSwitchなどの部品が入っている。
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    // app.blade.phpのid="app"であるdivタグにAppコンポーネントを挿入している。
    document.getElementById("app")
);
