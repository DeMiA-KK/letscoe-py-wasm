
const { loadPyodide } = require("pyodide")

const startPyodide = async (pyodide:any) => {
    const setupScript = `
        output_list = []
        def print(*args, end="\\n" ,sep=" ", file=None, flush=False):
        output_list.append(sep.join(str(arg) for arg in args))
    `
    await pyodide.runPythonAsync(setupScript);
}

export const runScript = async (code: string) => {
    const pyodide = await loadPyodide();

    await startPyodide(pyodide)
        .catch((err: unknown) => console.log(err))
    ;

    const result = await pyodide.runPythonAsync(code);
    return result;
}