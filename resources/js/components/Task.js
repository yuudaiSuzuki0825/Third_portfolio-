// Reactライブラリをインポート。
import React, { useState } from "react";
import EditModal from "./EditModal";

// getEditData()で使用するため。
let datas = { title: "", content: "" };

const Task = ({ task, deleteTask, suspendTask }) => {
    // モーダルウィンドウの指定。falseの時はEditModal.jsにおけるreturn内のif文の条件式（if(show)）を満たさないのでnullを返している。その結果，モーダルウインドウの表示はされない。
    // 編集ボタンがクリックされた時に，modalOpenメソッドが実行され，setShow(true)により値が変化。その結果，return内のif文の条件式を満たすことになりモーダルウインドウが表示される。
    const [show, setShow] = useState(false);
    // 編集ボタンを押下した際に表示されるモーダルウインドウのフォームに，予め以前の値をセットしておくために使用する。getEditData()を参照。
    const [editData, setEditData] = useState({ title: "", content: "" });

    const completed = () => {
        // TopPageコンポーネントのdeleteTaskメソッドを実行している。引数として各タスクのid（uuidのものではなく，データベースの主キーの方）を渡している。
        // 一度コンソールログにてres.dataによってgetTasksData()が何を行っているのか確認すると良い。各要素がオブジェクトになっている配列をres.dataとして渡していて，
        // そのオブジェクトのプロパティの中にid（主キー）も含まれている。そのidを用いている。
        deleteTask(task.id);
    };

    const suspend = () => {
        // TopPageコンポーネントのsuspendTaskメソッドを実行している。引数として各タスクのid（uuidのものではなく，データベースの主キーの方）を渡している。
        suspendTask(task.id);
    };

    // この関数では主にアクシオスを利用してサーバーサイドと通信して，Tasksテーブルの中から主キー（id）によって指定されたレコードを1つ取得する役割を果たしている。
    // 「.post("/api/edit")」はpostメソッドにて/api/editにリクエストを送信しているという意味。api.phpに記載されているeditアクションへと命令が渡される形になる。
    function getEditData() {
        axios
            .post("/api/edit", {
                id: task.id,
            })
            .then((res) => {
                // resには先程主キーで絞り込んだ該当レコード（$task）が格納されている。res.dataでアクセスできる。
                // 今回はtitleプロパティとcontentプロパティのみ必要。コンソールログで一度res.dataの中身を確認してみてほしい。
                // 上記で既に定義済みのdatas（オブジェクト）に各プロパティの値を代入している。
                datas["title"] = res.data.title;
                datas["content"] = res.data.content;
                // 代入が済んだdatasを新しいeditDataとして差し替えを行っている。
                setEditData(datas);
            })
            .catch(() => {
                // axiosを使ってサーバーサイド（Laravel側）へのアクセスに失敗したとき。
                console.log("通信に失敗しました");
            });
    }

    // この関数では該当するタスクのモーダルウインドウを表示させ，その中のフォーム内に予め以前の値をセットしておく役割を果たしている。
    const modalOpen = () => {
        // trueをセットすることでEditModal.jsのreturn内のif文の条件式を満たす。よって，モーダルウインドウ部分が表示される。
        setShow(true);
        getEditData();
    };

    return (
        <>
            <div className="container">
                <ul className="parent">
                    <li>{task.title}</li>
                    <li>{task.content}</li>
                    <li>
                        {/* 編集ボタン */}
                        <button onClick={modalOpen} className="editMark">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    </li>
                    <li>
                        {/* 完了ボタン */}
                        <button onClick={completed}>
                            <i className="fa-regular fa-circle-check"></i>
                        </button>
                    </li>
                    <li>
                        {/* 中断ボタン */}
                        <button onClick={suspend} className="xmark">
                            <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                    </li>
                </ul>
            </div>
            <EditModal
                show={show}
                setShow={setShow}
                task={task}
                editData={editData}
                setEditData={setEditData}
            />
        </>
    );
};

export default Task;
