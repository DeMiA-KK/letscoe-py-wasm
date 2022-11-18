// output_list生成用script
export const outputListScript = (listName: string) => {
    const setupScript = `
        ${listName} = []
        def print(*args, end="\\n" ,sep=" ", file=None, flush=False):
            ${listName}.append(sep.join(str(arg) for arg in args))
    `;
    return setupScript;
};

// requestsセットアップ用スクリプト
export const requestsScript = `
    from pyodide.http import pyfetch
    class Response:
        def __init__(self,status):
            self.status_code = status

    class requests:
        def __init__(self):
            self.status_code = None
        
        def get(
                self,
                url: str,
            ):
            res = pyfetch(url)
            return res
    
    requests = requests()
`;