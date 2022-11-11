import { PyodideInterface } from "pyodide"
import React from "react"

interface Window {
    loadPyodide:any
}
declare let window: Window

export const runScript = async (
        pyodide: PyodideInterface,
        code: string,
        setOutput: React.Dispatch<string>
    ) => {
    await pyodide.loadPackagesFromImports(code);

    const listName = "x" + Math.random().toString(36).substring(2,12);
    const setupScript = `
        ${listName} = []
        def print(*args, end="\\n" ,sep=" ", file=None, flush=False):
            ${listName}.append(sep.join(str(arg) for arg in args))
    `;
    await pyodide.runPython(setupScript);

    await pyodide.runPython(code);
    const outputList = await pyodide.globals.get(listName);
    setOutput(outputList);

    await pyodide.runPython(`del ${listName}`);
}

export const initPyodide = async (setPyodide: React.Dispatch<PyodideInterface>) => {
    const pyodide: PyodideInterface = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.3/full"
    });
    await pyodide.loadPackage("micropip");

    setPyodide(pyodide);
}
