import { PyodideInterface } from "pyodide"
import React from "react"

interface Window {
    loadPyodide:any
}
declare let window: Window

// const startPyodide = async (pyodide:any) => {
//     const setupScript = `
//         output_list = []
//         def print(*args, end="\\n" ,sep=" ", file=None, flush=False):
//         output_list.append(sep.join(str(arg) for arg in args))
//     `
//     await pyodide.runPythonAsync(setupScript);
// }

export const runScript = async (pyodide: PyodideInterface, code: string) => {
    const result = await pyodide.runPython(code);
    return result;
}

export const initPyodide = async (setPyodide: React.Dispatch<PyodideInterface>) => {
    const pyodide = await window.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.21.3/full"
    });
    setPyodide(pyodide);
}