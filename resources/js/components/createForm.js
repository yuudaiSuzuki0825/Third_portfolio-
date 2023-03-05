// Reactライブラリをインポート。
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
    })
);

// フラグを初期化している。カーソルキー移動のメソッドで使用。
let flg = false;

// inputChange, createTask, formDataをpropsとして受け取っている。
const CreateForm = ({ inputChange, createTask, formData }) => {
    // DOM操作。
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const button = document.getElementById("button");

    // マテリアルUI。
    const classes = useStyles();

    // この関数ではTopPageコンポーネントのinputChange()を実行している。その際，イベントオブジェクトを引数として渡している。
    // titleあるいはcontentフォームのvalueが書き換わるたびに実行される。
    const Change = (e) => {
        inputChange(e);
    };

    // この関数ではTopPageコンポーネントのcreateTask()を実行している。「作成する」ボタンがクリックされた時。
    const create = () => {
        createTask();
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
            title.selectionStart == title.value.length
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
            content.focus();
            // さらに，フォーカス地点を最後の文字にしている。
            // フォーカスとその地点の指定の両方を達成するためにはkeydownとkeyupの両イベントでメソッドを作る必要があった。
            content.setSelectionRange(
                content.value.length,
                content.value.length
            );
        }
    };

    // 以降は上記処理と大まかな流れは同じ。
    const keydownEvent2 = (e) => {
        if (
            e.code == "ArrowRight" &&
            content.selectionStart == content.value.length
        ) {
            flg = true;
        }
        if (e.code == "ArrowLeft" && content.selectionStart == 0) {
            flg = true;
        }
    };

    const keyUpEvent2 = (e) => {
        if (e.code == "ArrowRight" && flg) {
            button.focus();
        }
        if (e.code == "ArrowLeft" && flg) {
            flg = false;
            title.focus();
            title.setSelectionRange(title.value.length, title.value.length);
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
            content.focus();
            content.setSelectionRange(
                content.value.length,
                content.value.length
            );
        }
    };

    // -----------------------------------
    // カーソルキー移動のメソッドここまで。
    // -----------------------------------

    return (
        <form>
            <TextField
                id="title"
                label="title"
                variant="outlined"
                name="title"
                className={classes.textArea}
                // formDataのtitleプロパティの値をvalueにセットする必要がある。
                value={formData.title}
                onChange={Change}
                onKeyDown={keydownEvent}
                onKeyUp={keyUpEvent}
            />
            <TextField
                id="content"
                label="content"
                variant="outlined"
                name="content"
                className={classes.textArea}
                // formDataのcontentプロパティの値をvalueにセットする必要がある。
                value={formData.content}
                onChange={Change}
                onKeyDown={keydownEvent2}
                onKeyUp={keyUpEvent2}
            />
            <Button
                id="button"
                color="primary"
                variant="contained"
                href="/"
                onClick={create}
                onKeyDown={keydownEvent3}
                onKeyUp={keyUpEvent3}
            >
                作成
            </Button>
        </form>
    );
};

export default CreateForm;
