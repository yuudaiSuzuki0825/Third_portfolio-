// ReactとuseState, useEffectをインポート。
import React, { useState, useEffect } from "react";
// axios（アクシオス）のインポート。サーバーサイドとの通信に利用するため。
import axios from "axios";
import Suspension from "./Suspension";
// CreateFormコンポーネントのインポート。
import CreateForm from "./CreateForm";
// uuidのインポート。
import { v4 as uuidv4 } from "uuid";

// inputChangeメソッドで使用。
let datas = { title: "", content: "" };

const SuspendPage = () => {
    // SuspensionsとsetSuspensionsの定義。中断されたタスクの一覧を表示する際に使用。
    const [suspensions, setSuspensions] = useState([]);
    // constとsetCountの定義。完了数を表示する際に使用。
    const [count, setCount] = useState(0);
    // formDataとsetFormDataの定義。フォームに入力された値を一時的に保存する際に使用。
    const [formData, setFormData] = useState({ title: "", content: "" });

    // 第二引数に[]を指定した。これにより，マウント時に一回だけ下記の関数が呼び出される。
    useEffect(() => {
        // こちらの方が恐らく処理スピードが速いと思われる…。よって先に記述した。
        getCountData();
        // タスクの一覧を全て取ってくるので時間がかかるものと思われる。
        getSuspensionsData();
    }, []);

    const getSuspensionsData = () => {
        axios
            .get("/api/suspensions")
            .then((res) => {
                console.log(res.data);
                setSuspensions(res.data);
            })
            .catch(() => {
                // axiosを使ってサーバーサイド（Laravel側）へのアクセスに失敗したとき。
                console.log("通信に失敗しました");
            });
    };

    const getCountData = () => {
        axios
            .get("/api/count")
            .then((res) => {
                // resにはcountアクション内で作成された$count（countsテーブルのレコード数）が格納されている。res.dataでアクセスできる。
                // $countをcountにセットしている。これで表示が可能。
                setCount(res.data);
            })
            .catch(() => {
                // axiosを使ってサーバーサイド（Laravel側）へのアクセスに失敗したとき。
                console.log("通信に失敗しました");
            });
    };

    // この関数では主にフォームに入力された値を一時的に保持する役割を果たす。CreateFormコンポーネントのonChangeを参照。
    const inputChange = (e) => {
        // イベントオブジェクトからフォーム内の値やそのフォームのname属性にアクセスする。
        // Changeイベントが発生したフォームのname属性の値（titleないしはcontent）を格納しておく。
        const key = e.target.name;
        // Changeイベントが発生したフォームのvalue（titleないしはcontent）の値を格納しておく。
        const value = e.target.value;
        // keyにはtitleかcontentのいずれかが格納されているはずである。すなわちここでは，上記で定義済みのdatasオブジェクト内のtitleあるいはcontentプロパティに対応するvalueの値を上書きしているということになる。
        datas[key] = value;
        // 先程作成されたdatasをオブジェクトとして再加工している。何故かこの処理を挟まないと正常に動作しない…。
        let data = Object.assign({}, datas);
        // formDataにセットしている。datasからいきなりセットできないのは何故？
        setFormData(data);
    };

    // この関数では主にタスクを新規作成するための命令をサーバーサイドにリクエストする役割を果たしている。
    // エイシンクはアウェイトを使うために記述した。
    const createTask = async () => {
        // 早期リターン。フォームのvalueが空の時（もし仮にここをコメントアウトしてもデータベース側でnullを許容していないので何も起こらない）。
        if (formData == "") {
            // titleとcontentのどちらか一方でも空だとアウト。
            return;
        }
        // axiosの処理が完了するまで次の処理に移行しないように命令している。
        await axios
            // postメソッドにてapi/tasks/storeにリクエストを送信しているという意味。api.phpによりstoreアクションが実行される形となる。
            .post("/api/tasks/store", {
                // $requestとして渡す引数は以下の通り。詳しくはstoreアクションを参照。
                // formData（オブジェクト）の各プロパティ（title,content）の値を渡している。
                title: formData.title,
                content: formData.content,
            })
            .then((res) => {
                // res.dataにはTasksテーブルの全レコード情報（$tasks）が格納されている。それを新しいTasksとして差し替えている。
                setTasks(res.data);
                // フォームの中身を空にしている。
                setFormData("");
            })
            .catch((error) => {
                // axiosを使ってサーバーサイド（Laravel側）へのアクセスに失敗したとき。
                console.log(error);
            });
    };

    const restoreTask = async (id) => {
        await axios
            .post("/api/suspensions/restore", {
                id: id,
            })
            .then((res) => {
                setSuspensions(res.data);
                console.log("hoge!");
            })
            .catch((error) => {
                // axiosを使ってサーバーサイド（Laravel側）へのアクセスに失敗したとき。
                console.log(error);
            });
    };

    return (
        // 別にdivタグではなくてもOK（<></>でOK）。フラグメントと呼ばれる。
        <>
            <div className="numberCompleted">number-completed:{count}</div>
            <CreateForm
                // {(e) => inputChange(e)}は{inputChange}に書き換え可能。
                // このコンポーネントにはinputChangeとcreateTask，formDataをpropsとして渡している。
                // setFormDataは本コンポーネント内で使用するのみなので渡す必要はない（inputChangeで使用する）。
                inputChange={(e) => inputChange(e)}
                createTask={createTask}
                formData={formData}
            />
            <ul>
                <li>
                    {suspensions.map((suspension) => (
                        <Suspension
                            suspension={suspension}
                            key={uuidv4()}
                            restoreTask={restoreTask}
                        />
                    ))}
                </li>
            </ul>
        </>
    );
};

export default SuspendPage;
