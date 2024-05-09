// 需要分线程的代码 - 导出慢的问题是构建数据的时间过常 - 所以采用分步去计算数据 然后 合并数据 进行导出
const workerCode = () => {
    const exportExcel = (headers: any[], data: any[], fileName = 'demo.xlsx', frequency=0, uploadLength=2000) => {
        // 表头
        const _headers = headers
            .map(({ key, title }, i: number) =>
                Object.assign({}, { key, title, position: String.fromCharCode(65 + i) + 1 }),
            ).reduce(
                (prev: any, { position, key, title }) => {
                    const objs: any = {
                    };
                    objs[position] = { 
                        key: key,
                        v: title 
                    };
                    return Object.assign({},prev,objs);
                },{}
            );
        // 数据
        const _data = data
            .map((item: Record<string, any>, i: number) =>
                headers.map(({ key, valueEnum }, j: number) => {
                    const content = (valueEnum && valueEnum[item[key]]) || item[key];
                    const position = String.fromCharCode(65 + j) + (frequency==0?i+2:Number(frequency*uploadLength+i+2));
                    return Object.assign({}, { content, position });
                }),
            )
            .reduce((prev: any, next: any) => prev.concat(next)) // 对刚才的结果进行降维处理（二维数组变成一维数组）
            .reduce( // 转换成 worksheet 需要的结构
                (prev: any, next: { position: any; content: any }) => {
                    const objs: any = {
                    };
                    objs[next.position] = { 
                        v: next.content
                    };
                    return Object.assign({}, prev, objs);
                },
                {},
            );
        const output = frequency==0?Object.assign({}, _headers, _data):Object.assign({}, _data);
        const wb = {
            SheetNames: ['mySheet'],
            Sheets: {
                mySheet: Object.assign({}, output),
            },
        };
        return { wb, fileName: fileName + '.xlsx'};
    };
    // 监听获取每个工作线程传递过来的值 - 计算数据
    onmessage = (e) => {
        const { header, fileData, filename, frequency=0, uploadLength=2000 } = e.data;
        const resData = exportExcel(header, fileData, filename, frequency, uploadLength );
        // 将计算的结果传递出去
        postMessage(resData);
    };
};
// 把脚本代码转为string
let code = workerCode.toString();
code = code.substring(code.indexOf("{")+1, code.lastIndexOf("}"));
  
const blob = new Blob([code], {type: "application/javascript"});

export const workerScript = URL.createObjectURL(blob);