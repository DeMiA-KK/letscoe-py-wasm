/** @jsxImportSource @emotion/react  */
import { css, SerializedStyles } from "@emotion/react";
import { PyodideInterface } from "pyodide";
import React ,{ useState, useCallback } from "react";
import { useEffect } from "react";

import { PyConsole } from "../components/Console";
import { PyEditor } from "../components/Editor";
import { runScript, initPyodide } from "../pyodide/usePyodide";

export const CodingPage: React.FC = () => {
    const [output, setOutput] = useState("Hello, world!");
    const [script, setScript] = useState<string | undefined>("");
    const [pyodide, setPyodide] = useState<PyodideInterface>();

    useEffect(() => {
            initPyodide(setPyodide);
    },[]);

    const handleEditorChange = (value: string | undefined) => {
        setScript(value);
    };

    const handleRunButtonClick =  async () => {
        try{
            await runScript(pyodide!, script!, setOutput);
        }
        catch(err){
            setOutput(String(err));
        }
    };

    const mainStyle: SerializedStyles = css`
        display: flex;
        overflow: hidden;
        flex-direction: column;
        height: 100vh;
    `;

    const buttonContainerStyle: SerializedStyles = css`
        display: flex;
        width: 100%;
    `;

    const runButtonStyle: SerializedStyles = css`
        background-color: "orange";
    `;

    const editorContainerStyle: SerializedStyles = css`
        display: flex;
        flex: 1;
        overflow: hidden;
    `;

    const editorStyle: SerializedStyles = css`
        width: 50%;
    `;

    const outputStyle: SerializedStyles = css`
        width: 50%;
        border: solid;
    `;

    return (
        <div css={mainStyle}>
            <div css={buttonContainerStyle}>
                <div>
                    <button onClick={handleRunButtonClick} css={runButtonStyle}>Run</button>
                </div>
            </div>
            <div css={editorContainerStyle}>
                <div css={editorStyle}>
                    <PyEditor onChange={useCallback(handleEditorChange,[])}/>
                </div>
                <div css={outputStyle}>
                    <PyConsole output={output}/>
                </div>
            </div>
        </div>
    );
};