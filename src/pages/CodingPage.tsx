/** @jsxImportSource @emotion/react  */
import { css, SerializedStyles } from "@emotion/react";
import React ,{ useState } from "react";

import { PyConsole } from "../components/Console";
import { PyEditor } from "../components/Editor";
import { runScript } from "../pyodide/usePyodide";

export const CodingPage: React.FC = () => {
    const [output, setOutput] = useState("Hello, world");
    const [script, setScript] = useState<string | undefined>("");

    const handleEditorChange = (value: string | undefined) => {
        setScript(value);
    }

    const handleRunButtonClick =  async () => {
        const result = await runScript(script!);
        setOutput(result);
    }


    const containerStyle: SerializedStyles = css`
        display: flex;
        flex-flex-direction: column;
        overflow: hidden;
    `

    const runButtonStyle: SerializedStyles = css`
        background-color: "orange"
    `

    const editorStyle: SerializedStyles = css`
        height: 100vh;
        width: 50%;
    `

    const outputStyle: SerializedStyles = css`
        height: 100vh;
        width: 50%;
    `

    return (
        <div css={containerStyle}>

            <div css={editorStyle}>
                <div>
                    <button onClick={handleRunButtonClick} css={runButtonStyle}>Run</button>
                </div>
                <PyEditor onChange={handleEditorChange}/>
            </div>
            <div>
                <PyConsole output={output}/>
            </div>
        </div>
    )
}