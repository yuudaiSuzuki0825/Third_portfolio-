import React from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        textArea: {
            marginRight: theme.spacing(2),
        },
    })
);

// let datas = { name: "", content: "" };

let flg = false;

const CreateForm = ({ inputChange, createTask, formData }) => {
    // DOM操作。
    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const button = document.getElementById("button");

    const classes = useStyles();

    // const [formData, setFormData] = useState({ title: "", content: "" });

    const Change = (e) => {
        inputChange(e);
    };

    const create = () => {
        createTask();
    };

    const keydownEvent = (e) => {
        if (
            e.code == "ArrowRight" &&
            title.selectionStart == title.value.length
        ) {
            flg = true;
            console.log("hoge");
        }
    };

    const keyUpEvent = (e) => {
        if (e.code == "ArrowRight" && flg) {
            flg = false;
            content.focus();
            content.setSelectionRange(
                content.value.length,
                content.value.length
            );
        }
    };

    const keydownEvent2 = (e) => {
        if (
            e.code == "ArrowRight" &&
            content.selectionStart == content.value.length
        ) {
            flg = true;
        }
        if (e.code == "ArrowLeft" && content.selectionStart == 0) {
            flg = true;
        }
    };

    const keyUpEvent2 = (e) => {
        if (e.code == "ArrowRight" && flg) {
            button.focus();
        }
        if (e.code == "ArrowLeft" && flg) {
            flg = false;
            title.focus();
            title.setSelectionRange(title.value.length, title.value.length);
        }
    };

    const keydownEvent3 = (e) => {
        if (e.code == "ArrowLeft") {
            flg = true;
        }
    };

    const keyUpEvent3 = (e) => {
        if (e.code == "ArrowLeft" && flg) {
            flg = false;
            content.focus();
            content.setSelectionRange(
                content.value.length,
                content.value.length
            );
        }
    };

    return (
        <form>
            <TextField
                id="title"
                label="title"
                variant="outlined"
                name="title"
                className={classes.textArea}
                value={formData.title}
                onChange={Change}
                onKeyDown={keydownEvent}
                onKeyUp={keyUpEvent}
            />
            <TextField
                id="content"
                label="content"
                variant="outlined"
                name="content"
                className={classes.textArea}
                value={formData.content}
                onChange={Change}
                onKeyDown={keydownEvent2}
                onKeyUp={keyUpEvent2}
            />
            <Button
                id="button"
                color="primary"
                variant="contained"
                href="/"
                onClick={create}
                onKeyDown={keydownEvent3}
                onKeyUp={keyUpEvent3}
            >
                作成
            </Button>
        </form>
    );
};

export default CreateForm;
