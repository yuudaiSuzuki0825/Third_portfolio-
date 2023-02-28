import React, { useState, useEffect } from "react";
// axios（アクシオス）のインポート。
import axios from "axios";
import Task from "../components/Task";
import CreateForm from "./CreateForm";
import { v4 as uuidv4 } from "uuid";

let datas = { name: "", content: "" };

function TopPage() {
    const [tasks, setTasks] = useState([]);
    const [count, setCount] = useState(0);

    const [formData, setFormData] = useState({ title: "", content: "" });

    useEffect(() => {
        getCountData();
        getTasksData();
    }, []);

    const getTasksData = () => {
        axios
            .get("/api/tasks")
            .then((res) => {
                // console.log(res.data);
                setTasks(res.data);
            })
            .catch(() => {
                // axiosを使ってサーバーサイド（Laravel側）へのアクセスに失敗したとき。
                console.log("通信に失敗しました");
            });
    };

    const getCountData = () => {
        axios
            .get("/api/count")
            .then((res) => {
                // console.log(res.data);
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
