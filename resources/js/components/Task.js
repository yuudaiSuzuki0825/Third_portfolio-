// Reactライブラリをインポート。
import React from "react";

const Task = ({ task, deleteTask }) => {
    const completed = () => {
        // TopPageコンポーネントのdeleteTaskメソッドを実行している。引数として各タスクのid（uuidのものではなく，データベースの主キーの方）を渡している。
        // 一度コンソールログにてres.dataによってgetTasksData()が何を行っているのか確認すると良い。各要素がオブジェクトの配列をres.dataとして渡していて，
        // そのオブジェクトのプロパティの中にid（主キー）も含まれている。そのidを用いている。
        deleteTask(task.id);
    };
    return (
        <div className="container">
            <ul className="parent">
                <li>{task.title}</li>
                <li>{task.content}</li>
                <li>
                    <button onClick={completed}>
                        <i className="fa-solid fa-check"></i>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Task;
