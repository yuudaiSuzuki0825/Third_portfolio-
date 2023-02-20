import React from "react";

const createForm = () => {
    return (
        <form>
            <label>
                タイトル
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={inputChange}
                />
            </label>
            <label>
                本文
                <textarea
                    value={formData.content}
                    name="content"
                    id="content"
                    onChange={inputChange}
                >
                    {formData.content}
                </textarea>
            </label>
            <button type="submit" href="/" onClick={createTask}>
                作成
            </button>
        </form>
    );
};

export default createForm;
