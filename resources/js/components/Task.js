import React from "react";

const Task = ({ task, deleteTask }) => {
    const completed = () => {
        deleteTask(task.id);
    };
    return (
        <div className="container">
            <ul className="parent">
                <li>{task.title}</li>
                <li>{task.content}</li>
                <li>
                    <button onClick={completed}>
                        <i class="fa-solid fa-check"></i>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Task;
