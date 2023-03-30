import React from "react";
// マテリアルUIをインポート。
import { TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// マテリアルUI。
const useStyles = makeStyles((theme) =>
    createStyles({
        textArea: {
            marginRight: theme.spacing(2),
        },
        button: {
            marginTop: theme.spacing(1),
        },
    })
);

// フラグを初期化している。カーソルキー移動のメソッドで使用。
let flg = false;

const EditModal = ({ show, setShow, task, editData, setEditData }) => {
    // DOM操作。
    const title2 = document.getElementById("title2");
    const content2 = document.getElementById("content2");
    const button2 = document.getElementById("button2");

    // モーダルウインドウのマスク部分がクリックされた時，以下のメソッドが実行され，モーダルウインドウが非表示になる。
    const closeModal = () => {
        // 本コンポーネントのreturn内のif文の条件式を満たさなくなるのでnullを返す。すなわち，モーダルウインドウが非表示となる。
        setShow(false);
    };

    // マテリアルUI。
    const classes = useStyles();

    // フォームの入力値が変化するたびに実行される関数。
    const inputChange = (e) => {
        // 入力値が変化したフォームのname属性の値を取得している。値はtitleかcontentのどちらか。
        const key = e.target.name;
        // タイトルのフォームの入力値が変化したとき。
        if (key === "title") {
            // タイトルのフォームの入力値を取得。
            const value = e.target.value;
            // 新たにオブジェクトを定義。中身は，titleプロパティとcontentプロパティ。titleプロパティには先程のvalueを値としてセットし，
            // contentプロパティにはeditDataのcontentプロパティの値をセットしている。
            let datas = { title: value, content: editData.content };
            // 先程作成されたdatasをオブジェクトとして再加工している。何故かこの処理を挟まないと正常に動作しない…。
            let data = Object.assign({}, datas);
            // editDataの新たな値として差し替えを行っている。
            setEditData(data);
        } else if (key === "content") {
            // コンテンツのフォームの入力値が変化したとき。
            // 以下の処理は上記と逆ではあるが同じフロー。
            const value = e.target.value;
            // 今度はtitleプロパティの方がeditDataのtitleプロパティの値でセットされている。contentプロパティにはvalueがセットされている。
            let datas = { title: editData.title, content: value };
            // 先程作成されたdatasをオブジェクトとして再加工している。何故かこの処理を挟まないと正常に動作しない…。
            let data = Object.assign({}, datas);
            // editDataの新たな値として差し替えを行っている。
            setEditData(data);
        }
    };

    // この関数では主にアクシオスを利用してタスクの更新をサーバーサイドにリクエストする役割を果たしている。
    const updateTask = () => {
        // 早期リターン。フォームのvalueが空の時。
        // if (editData.title == "" || editData.content) {
        //     return;
        // }
        // /api/updateにpostメソッドでリクエストを送っている。サーバーサイドのupdateアクションが実行される形になる。
        axios
            .post("/api/update", {
                // レコードを識別するためにidが必要。そのためにtaskを渡した。このidはデータベースの主キーの方のものであり，uuidではない。
                id: task.id,
                // フォーム内で新規に更新された内容（タイトルとコンテンツ）を渡している。
                title: editData.title,
                content: editData.content,
            })
            // 今回サーバーサイドからは何もデータを受け取らないのでthenはなし。
            .catch((error) => {
                console.log(error);
            });
    };

    // -----------------------------------
    // カーソルキー移動のメソッドここから。
    // -----------------------------------

    // keydownEvent及びkeyUpEventはtitleからcontentに移動する際に使用。
    // keydownEvent2及びkeyUpEvent2はcontentからbuttonに，contentからtitleに移動する際に使用。
    // keydownEvent3及びkeyUpEvent3はbuttonからcontentに移動する際に使用。
    // ArrowRightは右矢印ボタンを，ArrowLeftは左矢印ボタンを意味している。

    const keydownEvent = (e) => {
        // 右矢印ボタンがクリックされ，かつtitleフォームの値の最後の地点に位置していた時。
        if (
            e.code == "ArrowRight" &&
            title2.selectionStart == title2.value.length
        ) {
            // フラグを反転させている。
            flg = true;
            // console.log("hoge");
        }
    };

    const keyUpEvent = (e) => {
        // 右矢印ボタンがクリックされ，かつflgがtrueの時。
        if (e.code == "ArrowRight" && flg) {
            // フラグを元に戻している。
            flg = false;
            // contentフォームにフォーカスしている。
            content2.focus();
            // さらに，フォーカス地点を最後の文字にしている。
            // フォーカスとその地点の指定の両方を達成するためにはkeydownとkeyupの両イベントでメソッドを作る必要があった。
            content2.setSelectionRange(
                content2.value.length,
                content2.value.length
            );
        }
    };

    // 以降は上記処理と大まかな流れは同じ。
    const keydownEvent2 = (e) => {
        if (
            e.code == "ArrowRight" &&
            content2.selectionStart == content2.value.length
        ) {
            flg = true;
        }
        if (e.code == "ArrowLeft" && content2.selectionStart == 0) {
            flg = true;
        }
    };

    const keyUpEvent2 = (e) => {
        if (e.code == "ArrowRight" && flg) {
            button2.focus();
        }
        if (e.code == "ArrowLeft" && flg) {
            flg = false;
            title2.focus();
            title2.setSelectionRange(title2.value.length, title2.value.length);
        }
    };

    const keydownEvent3 = (e) => {
        if (e.code == "ArrowLeft") {
            flg = true;
        }
    };

    const keyUpEvent3 = (e) => {
        if (e.code == "ArrowLeft" && flg) {
            flg = false;
            content2.focus();
            content2.setSelectionRange(
                content2.value.length,
                content2.value.length
            );
        }
    };

    // -----------------------------------
    // カーソルキー移動のメソッドここまで。
    // -----------------------------------

    // 編集ボタンがクリックされた時，setShow()によりshowの値がtrueに差し替えられる。これによりモーダルウインドウ（編集欄）が表示される。
    if (show) {
        return (
            // マスク部分がクリックされるとモーダルウインドウ（編集欄）が閉じられる。
            <div id="overlay" onClick={closeModal}>
                {/* モーダルウインドウ内部がクリックされても閉じてしまわないようにしている（e.stopPropagation()がその処理を行っている）。 */}
                <div id="modalContent" onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={updateTask}>
                        <TextField
                            id="title2"
                            label="title"
                            variant="outlined"
                            name="title"
                            className={classes.textArea}
                            value={editData.title}
                            onChange={inputChange}
                            onKeyDown={keydownEvent}
                            onKeyUp={keyUpEvent}
                        />
                        <TextField
                            id="content2"
                            label="content"
                            variant="outlined"
                            name="content"
                            className={classes.textArea}
                            value={editData.content}
                            onChange={inputChange}
                            onKeyDown={keydownEvent2}
                            onKeyUp={keyUpEvent2}
                        />
                        <Button
                            id="button2"
                            color="primary"
                            variant="contained"
                            className={classes.button}
                            href="/"
                            onClick={updateTask}
                            onKeyDown={keydownEvent3}
                            onKeyUp={keyUpEvent3}
                        >
                            更新
                        </Button>
                    </form>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default EditModal;
