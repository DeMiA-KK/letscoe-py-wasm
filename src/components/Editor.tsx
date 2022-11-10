/** @jsxImportSource @emotion/react  */

import { css } from "@emotion/react";
import Editor,{ OnChange } from "@monaco-editor/react";
import React ,{ memo } from "react";

type PyEditorProps = {
    onChange: OnChange
}

export const PyEditor: React.FC<PyEditorProps> = memo((props) => {
    return(
        <>
        <Editor
            height={"100%"}
            theme={"vs-dark"}
            defaultLanguage={"python"}
            onChange={props.onChange}
        />
        </>
    )
})

PyEditor.displayName = "PyEditor";