import React, { useState } from "react";
// Modalコンポーネントのインポート。
import Modal from "./Modal";

const Suspension = ({ suspension, restoreTask, destoryTask }) => {
    // モーダルウィンドウの指定。
    const [show, setShow] = useState(false);

    const restore = () => {
        restoreTask(suspension.id);
    };

    // const destory = () => {
    //     destoryTask(suspension.id);
    // };

    return (
        <>
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
                        <button onClick={() => setShow(true)} className="xMark">
                            <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <Modal
                show={show}
                setShow={setShow}
                suspension={suspension}
                destoryTask={destoryTask}
            />
        </>
    );
};

export default Suspension;
