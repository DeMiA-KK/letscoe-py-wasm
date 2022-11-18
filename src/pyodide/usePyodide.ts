import { PyodideInterface } from "pyodide"
import React from "react"

import { outputListScript, requestsScript } from "./setupScript"

interface Window {
    loadPyodide:any
}
declare let window: Window

// Pyodide初期化関数
export const initPyodide = async (setPyodide: React.Dispatch<PyodideInterface>) => {
    const pyodide: PyodideInterface = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.3/full"
    });
    await pyodide.loadPackage("micropip");

    setPyodide(pyodide);
};

// pythonコード実行関数
export const runScript = async (
        pyodide: PyodideInterface,
        code: string,
        setOutput: React.Dispatch<string>
    ) => {
    const replacedCode = await customLoadPackages(pyodide, code);

    const listName = await genOutputList(pyodide);

    await pyodide.runPythonAsync(replacedCode);
    const outputList = await pyodide.globals.get(listName);
    setOutput(outputList);

    await pyodide.runPythonAsync(`del ${listName}`);
};

// パッケージロード用関数
const customLoadPackages = async (pyodide: PyodideInterface, code: string) => {
    if(code.indexOf("import requests") !== -1){
        const replacedCode = code.replace("import requests", "# import requests");
        await pyodide.loadPackagesFromImports(replacedCode);
        await setupRequests(pyodide);
        return replacedCode;
	}
    else{
        await pyodide.loadPackagesFromImports(code);
        return code;
    }
};

// 出力格納リスト生成 + print関数オーバーライド
const genOutputList = async (pyodide: PyodideInterface) => {
    const listName = "x" + Math.random().toString(36).substring(2,12);
    const setupScript = outputListScript(listName);
    await pyodide.runPythonAsync(setupScript);
    return listName;
};

// requestsセットアップ関数
const setupRequests = async (pyodide: PyodideInterface) => {
    await pyodide.runPythonAsync(requestsScript);
};
