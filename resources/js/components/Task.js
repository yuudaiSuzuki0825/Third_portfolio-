import React from "react";

const Task = ({ task, deleteTask }) => {
    const completed = () => {
        deleteTask(task.id);
    };
    return (
        <div>
            {task.title}:{task.content}:
            <button onClick={completed}>完了</button>
            <a href={`/edit/${task.id}`}>更新</a>
        </div>
    );
};

export default Task;
