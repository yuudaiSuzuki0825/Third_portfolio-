// ReactとuseState, useEffectをインポート。
import React, { useState, useEffect } from "react";
// axios（アクシオス）のインポート。サーバーサイドとの通信に利用するため。
import axios from "axios";
// Taskコンポーネントのインポート。
import Task from "./Task";
// CreateFormコンポーネントのインポート。
import CreateForm from "./CreateForm";
// uuidのインポート。
import { v4 as uuidv4 } from "uuid";

let datas = { name: "", content: "" };

function TopPage() {
    // tasksとsetTasksの定義。タスク一覧を表示する際に使用。
    const [tasks, setTasks] = useState([]);
    // constとsetCountの定義。完了数を表示する際に使用。
    const [count, setCount] = useState(0);
    // formDataとsetFormDataの定義。フォームに入力された値を一時的に保存する際に使用。
    const [formData, setFormData] = useState({ title: "", content: "" });

    // 第二引数に[]を指定した。これにより，マウント時に一回だけ下記の関数が呼び出される。
    useEffect(() => {
        // こちらの方が恐らく処理スピードが速いと思われる…。よって先に記述した。
        getCountData();
        // タスクの一覧を全て取ってくるので時間がかかるものと思われる。
        getTasksData();
    }, []);

    // この関数では主にアクシオスを利用してサーバーサイドと通信して，Tasksテーブルの全レコードを取得している。
    // 「.get("/api/tasks")」はgetメソッドにて/api/tasksにリクエストを送信しているという意味。api.phpに記載されているindexアクションへと命令が渡される形になる。
    const getTasksData = () => {
        axios
            .get("/api/tasks")
            .then((res) => {
                // resではindexアクション内における$tasksが格納されている。res.dataでアクセスできる。
                // $tasks（Tasksテーブルの全レコード）をTasksにセットしている。これで表示が可能になる。
                setTasks(res.data);
            })
            .catch(() => {
                // axiosを使ってサーバーサイド（Laravel側）へのアクセスに失敗したとき。
                console.log("通信に失敗しました");
            });
    };

    // いずれ無くす予定。
    const getCountData = () => {
        axios
            .get("/api/count")
            .then((res) => {
                setCount(res.data);
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
        getCountData();
    };

    return (
        // 別にdivタグではなくてもOK（<></>でOK）。フラグメントと呼ばれる。
        <>
            <div className="numberCompleted">number-completed:{count}</div>
            <CreateForm
                inputChange={(e) => inputChange(e)}
                createTask={createTask}
                formData={formData}
            />
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
        </>
    );
}

export default TopPage;
