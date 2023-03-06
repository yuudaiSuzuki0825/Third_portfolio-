import React from "react";

const Suspension = ({ suspension, restoreTask }) => {
    const restore = () => {
        restoreTask(suspension.id);
    };

    return (
        <div className="container">
            <ul className="parent">
                <li>{suspension.title}</li>
                <li>{suspension.content}</li>
                <li>
                    <button onClick={restore}>
                        <i class="fa-regular fa-circle-up"></i>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Suspension;
