import React, { useState, useEffect } from "react";
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

// inputChangeメソッドで使用。
let datas = { title: "", content: "" };

const EditModal = ({ show, setShow, task }) => {
    const closeModal = () => {
        setShow(false);
    };

    // マテリアルUI。
    const classes = useStyles();

    const [editData, setEditData] = useState({ title: "", content: "" });

    // useEffect(() => {
    //     let isMounted = true;
    //     if (isMounted) {
    //         setEditData(datas);
    //     }
    //     getEditData();
    //     return () => {
    //         isMounted = false;
    //     };
    // }, []);

    function getEditData() {
        axios
            .post("/api/edit", {
                id: task.id,
            })
            .then((res) => {
                // console.log(res.data);
                // console.log(res.data.title);
                // console.log(res.data.content);
                datas["title"] = res.data.title;
                datas["content"] = res.data.content;
                // setEditData(datas);
                // console.log(datas);
            })
            .catch(() => {
                console.log("通信に失敗しました");
            });
    }

    const inputChange = (e) => {
        // console.log(e.target.name);
        // console.log(e.target.value);
        // const key = e.target.name;
        // const value = e.target.value;
        datas[e.target.name] = e.target.value;
        console.log(datas);
        // // 先程作成されたdatasをオブジェクトとして再加工している。何故かこの処理を挟まないと正常に動作しない…。
        let data = Object.assign({}, datas);
        setEditData(data);
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
