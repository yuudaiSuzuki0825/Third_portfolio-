import React from "react";

const Completion = ({ completion, destoryTask }) => {
    const destory = () => {
        destoryTask(completion.id);
    };

    return (
        <div className="container">
            <ul className="parent">
                <li>{completion.title}</li>
                <li>{completion.content}</li>
                <li>
                    <button onClick={destory} className="xmark">
                        <i className="fa-regular fa-circle-xmark"></i>
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Completion;
