import React from "react";

const Modal = ({ show, setShow, completion, suspension, destoryTask }) => {
    // 中断一覧か完了一覧かによって場合分けを行っている。
    const destory = () => {
        // 完了一覧からモーダルウィンドウを呼び出し，ダミーの削除ボタンが押下された時。
        if (completion) {
            destoryTask(completion.id);
        } else {
            // 中断一覧からモーダルウィンドウを呼び出し，ダミーの削除ボタンが押下された時。
            destoryTask(suspension.id);
        }
    };

    const closeModal = () => {
        setShow(false);
    };
    if (show) {
        return (
            <div id="overlay" onClick={closeModal}>
                <div id="modalContent" onClick={(e) => e.stopPropagation()}>
                    <p>本当に削除しますか？この操作は取り消せません。</p>
                    <button onClick={destory}>yes</button>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Modal;
