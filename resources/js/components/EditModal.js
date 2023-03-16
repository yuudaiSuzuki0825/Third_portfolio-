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

const EditModal = ({ show, setShow, task, editData, setEditData }) => {
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

    const updateTask = () => {
        if (editData == "") {
            return;
        }
        axios
            .post("/api/update", {
                id: task.id,
                title: editData.title,
                content: editData.content,
            })
            .catch((error) => {
                console.log(error);
            });
    };

    if (show) {
        return (
            <div id="overlay" onClick={closeModal}>
                <div id="modalContent" onClick={(e) => e.stopPropagation()}>
                    <form>
                        <TextField
                            id="title"
                            label="title"
                            variant="outlined"
                            name="title"
                            className={classes.textArea}
                            value={editData.title}
                            onChange={inputChange}
                            // onKeyDown={keydownEvent}
                            // onKeyUp={keyUpEvent}
                        />
                        <TextField
                            id="content"
                            label="content"
                            variant="outlined"
                            name="content"
                            className={classes.textArea}
                            value={editData.content}
                            onChange={inputChange}
                            // onKeyDown={keydownEvent2}
                            // onKeyUp={keyUpEvent2}
                        />
                        <Button
                            id="button"
                            color="primary"
                            variant="contained"
                            href="/"
                            onClick={updateTask}
                            // onKeyDown={keydownEvent3}
                            // onKeyUp={keyUpEvent3}
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
