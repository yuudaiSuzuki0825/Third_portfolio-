// Reactライブラリをインポート。
import React, { useState } from "react";
import EditModal from "./EditModal";

const Task = ({ task, deleteTask, suspendTask }) => {
    // モーダルウィンドウの指定。
    const [show, setShow] = useState(false);

    const completed = () => {
        // TopPageコンポーネントのdeleteTaskメソッドを実行している。引数として各タスクのid（uuidのものではなく，データベースの主キーの方）を渡している。
        // 一度コンソールログにてres.dataによってgetTasksData()が何を行っているのか確認すると良い。各要素がオブジェクトの配列をres.dataとして渡していて，
        // そのオブジェクトのプロパティの中にid（主キー）も含まれている。そのidを用いている。
        deleteTask(task.id);
    };

    const suspend = () => {
        suspendTask(task.id);
    };
    return (
        <>
            <div className="container">
                <ul className="parent">
                    <li>{task.title}</li>
                    <li>{task.content}</li>
                    <li>
                        <button
                            onClick={() => setShow(true)}
                            className="editMark"
                        >
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
            <EditModal show={show} setShow={setShow} task={task} />
        </>
    );
};

export default Task;
