/** @jsxImportSource @emotion/react  */

import { css } from "@emotion/react";
import Editor,{ OnChange } from "@monaco-editor/react";
import React from "react";

type PyEditorProps = {
    onChange: OnChange
}

export const PyEditor: React.FC<PyEditorProps> = (props) => {
    return(
        <>
        <Editor
            // height={"120%"}
            theme={"vs-dark"}
            defaultLanguage={"python"}
            onChange={props.onChange}
        />
        </>
    )
}