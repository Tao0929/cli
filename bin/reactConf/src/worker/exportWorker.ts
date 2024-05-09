import * as XLSX from 'xlsx';
import { arrSplice } from '@/utils';
import { workerScript } from './businessComputing/exportWorkerScript';

/**
 * @description: 线程池
    
 */
export interface WorkerScriptInterface {
    allData: any[]; // 全部数据
    fileDataColumn: any[]; // 表格列
    filename: string; // 文件名
    callback: () => void; // 回调
    chunkSize: number; // 块大小
    maxConcurrency: number; // 并发量
    progressCallback: (progressData: number) => void; // 进度回调
}

/**
 * 
 * @param param0 导出函数
 */
export const exportFun = async ({ 
    allData = [],
    fileDataColumn = [],
    filename = '',
    callback,
    chunkSize,
    maxConcurrency=10,
    progressCallback,
}: WorkerScriptInterface) => {
    const MAX_CONCURRENCY = maxConcurrency; // 最大并发数量
    const allDataCount = allData?.length; // allData splice 处理后会变成空的
    const numChunks = Math.ceil(allData.length / chunkSize); // 应该执行的线程数
    const chunkList = arrSplice(allData, chunkSize); // 每个线程需要执行的数据list
    let computedCount = 0; // 已经执行的线程数据
    const allSheets = {}; // 最新的计算结果

    const executeWorker = async (itemArr: any[], index: number) => {
        return new Promise<void>((resolve,) => {
            const workerName = `任务序列：${index}`;
            const worker = new Worker(workerScript, { name: workerName });
            worker.postMessage({
                header: fileDataColumn,
                fileData: itemArr,
                filename: filename,
                frequency: index,
                uploadLength: chunkSize,
            });

            worker.addEventListener('message', (e) => {
                worker.terminate();
                Object.assign(allSheets, { ...e.data.wb.Sheets.mySheet });
                resolve();
            });
        });
    };

    // 已执行数 小于 全部需执行数 （表示还未执行完成）
    while (computedCount < numChunks) {
        const pendingTasks = [];
        // 待执行任务数量 小于 并发任务数量  且  已执行任务数 小于 全部需执行任务数
        while (pendingTasks.length < MAX_CONCURRENCY && computedCount < numChunks) {
            const index = computedCount;
            const itemArr = chunkList[computedCount];
            const task = executeWorker(itemArr, index);
            pendingTasks.push(task);
            computedCount++;
        }
        // 执行 并发线程任务
        const resData = await Promise.all(pendingTasks);
        if (resData) {
            progressCallback((computedCount / numChunks) * 100);
            console.log('完成度' + Number((computedCount / numChunks) * 100).toFixed(2) + '%')
        }
    }
    if (computedCount === numChunks) {
        console.log('All tasks completed');
        const wb = {
            SheetNames: ['mySheet'],
            Sheets: {
                mySheet:  {
                    '!ref': `A1:${String.fromCharCode(65 + fileDataColumn?.length - 1)}${allDataCount + fileDataColumn?.length}`, 
                    '!cols': fileDataColumn?.map((item: any) => {
                        return { wpx: 200 };
                    }),
                    ...allSheets,
                }
            }
        };

        XLSX.writeFile(wb, filename);
        callback?.();
    }
};

