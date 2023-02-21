import React, { useState, useEffect, useRef } from "react";
// axios（アクシオス）のインポート。
import axios from "axios";
import Task from "../components/Task";
import { v4 as uuidv4 } from "uuid";
import { TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        textArea: {
            marginRight: theme.spacing(2),
        },
    })
);

let datas = { name: "", content: "" };

let flg = false;

function TopPage() {
    const [tasks, setTasks] = useState([]);

    const classes = useStyles();

    const [formData, setFormData] = useState({ title: "", content: "" });

    // DOM操作。
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const button = document.getElementById("button");

    useEffect(() => {
        getTasksData();
    }, []);

    const getTasksData = () => {
        axios
            .get("/api/tasks")
            .then((res) => {
                setTasks(res.data);
                // setCount(res.data[1].count);
                console.log(res.data);
            })
            .catch(() => {
                // axiosを使ってサーバーサイド（Laravel側）へのアクセスに失敗したとき。
                console.log("通信に失敗しました");
            });
    };

    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        datas[key] = value;
        let data = Object.assign({}, datas);
        setFormData(data);
    };

    const createTask = async () => {
        if (formData == "") {
            return;
        }
        await axios
            .post("/api/tasks/store", {
                title: formData.title,
                content: formData.content,
            })
            .then((res) => {
                const tempTasks = tasks;
                tempTasks.push(res.data);
                console.log(res.data);
                setTasks(tempTasks);
                setFormData("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteTask = async (id) => {
        await axios
            .post("/api/delete", {
                id: id,
            })
            .then((res) => {
                setTasks(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const keydownEvent = (e) => {
        if (
            e.code == "ArrowRight" &&
            title.selectionStart == title.value.length
        ) {
            flg = true;
            console.log("hoge");
        }
    };

    const keyUpEvent = (e) => {
        if (e.code == "ArrowRight" && flg) {
            flg = false;
            content.focus();
            content.setSelectionRange(
                content.value.length,
                content.value.length
            );
        }
    };

    const keydownEvent2 = (e) => {
        if (
            e.code == "ArrowRight" &&
            content.selectionStart == content.value.length
        ) {
            flg = true;
        }
    };

    const keyUpEvent2 = (e) => {
        if (e.code == "ArrowRight" && flg) {
            button.focus();
        }
    };

    return (
        <div className="container">
            <h1>todoApp</h1>
            <form>
                <TextField
                    id="title"
                    label="title"
                    variant="outlined"
                    name="title"
                    className={classes.textArea}
                    value={formData.title}
                    onChange={inputChange}
                    onKeyDown={keydownEvent}
                    onKeyUp={keyUpEvent}
                />
                <TextField
                    id="content"
                    label="content"
                    variant="outlined"
                    name="content"
                    className={classes.textArea}
                    value={formData.content}
                    onChange={inputChange}
                    onKeyDown={keydownEvent2}
                    onKeyUp={keyUpEvent2}
                />
                <Button
                    id="button"
                    color="primary"
                    variant="contained"
                    href="/"
                    onClick={createTask}
                >
                    作成
                </Button>
            </form>
            <ul>
                <li>
                    {tasks.map((task) => (
                        <Task
                            task={task}
                            key={uuidv4()}
                            deleteTask={deleteTask}
                        />
                    ))}
                </li>
            </ul>
        </div>
    );
}

export default TopPage;
