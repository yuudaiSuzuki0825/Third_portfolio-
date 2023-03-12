import React, { useState } from "react";
// Modalコンポーネントのインポート。
import Modal from "./Modal";

const Completion = ({ completion, destoryTask }) => {
    // モーダルウィンドウの指定。
    const [show, setShow] = useState(false);

    // const destory = () => {
    //     destoryTask(completion.id);
    // };

    return (
        <>
            <div className="container">
                <ul className="parent">
                    <li>{completion.title}</li>
                    <li>{completion.content}</li>
                    <li>
                        <button onClick={() => setShow(true)} className="xmark">
                            <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <Modal
                show={show}
                setShow={setShow}
                completion={completion}
                destoryTask={destoryTask}
            />
        </>
    );
};

export default Completion;
