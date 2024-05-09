/**
 * 
 * @param arr 数据源
 * @param chunkSize 切割尺寸
 * @returns 数据切割
 */
export const arrSplice = (arr: any[], chunkSize: number) => {
    let resSplice = [];
    if (arr.length > chunkSize) {
        while (arr.length > 0) {
            const chunk = arr.splice(0, chunkSize);
            resSplice.push(chunk);
        }
    } else {
        resSplice = [arr];
    }
    return resSplice;
};