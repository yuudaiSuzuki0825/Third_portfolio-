// Reactライブラリをインポート。
import React, { useState } from "react";
import EditModal from "./EditModal";

let datas = { title: "", content: "" };

const Task = ({ task, deleteTask, suspendTask }) => {
    // モーダルウィンドウの指定。
    const [show, setShow] = useState(false);
    const [editData, setEditData] = useState({ title: "", content: "" });

    const completed = () => {
        // TopPageコンポーネントのdeleteTaskメソッドを実行している。引数として各タスクのid（uuidのものではなく，データベースの主キーの方）を渡している。
        // 一度コンソールログにてres.dataによってgetTasksData()が何を行っているのか確認すると良い。各要素がオブジェクトの配列をres.dataとして渡していて，
        // そのオブジェクトのプロパティの中にid（主キー）も含まれている。そのidを用いている。
        deleteTask(task.id);
    };

    const suspend = () => {
        suspendTask(task.id);
    };

    function getEditData() {
        axios
            .post("/api/edit", {
                id: task.id,
            })
            .then((res) => {
                // console.log(res.data);
                console.log(res.data.title);
                console.log(res.data.content);
                datas["title"] = res.data.title;
                datas["content"] = res.data.content;
                setEditData(datas);
                // console.log(datas);
            })
            .catch(() => {
                console.log("通信に失敗しました");
            });
    }

    const modalOpen = () => {
        setShow(true);
        getEditData();
    };

    return (
        <>
            <div className="container">
                <ul className="parent">
                    <li>{task.title}</li>
                    <li>{task.content}</li>
                    <li>
                        <button onClick={modalOpen} className="editMark">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </li>
                    <li>
                        <button onClick={completed}>
                            <i className="fa-regular fa-circle-check"></i>
                        </button>
                    </li>
                    <li>
                        <button onClick={suspend} className="xmark">
                            <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <EditModal
                show={show}
                setShow={setShow}
                task={task}
                editData={editData}
                setEditData={setEditData}
            />
        </>
    );
};

export default Task;
