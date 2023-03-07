import React from "react";

const Suspension = ({ suspension, restoreTask, destoryTask }) => {
    const restore = () => {
        restoreTask(suspension.id);
    };

    const destory = () => {
        destoryTask(suspension.id);
    };

    return (
        <div className="container">
            <ul className="parent">
                <li>{suspension.title}</li>
                <li>{suspension.content}</li>
                <li>
                    <button onClick={restore}>
                        <i className="fa-regular fa-circle-up"></i>
                    </button>
                </li>
                <li>
                    <button onClick={destory} className="xmark">
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Suspension;
