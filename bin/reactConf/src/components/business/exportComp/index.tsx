import { exportFun } from "@/worker/exportWorker";
import { Button, Card, Input, Progress, Space } from "antd";
import { useRef, useState } from "react";
/**
 * 
 * @returns 前端导出组件
 */
const ExportBtn: React.FC = () => {
    // 导出数据构建
    const structureData = (length=10000) => {
        const data = Array.from({length}, (_, index) => ({
            iccid: index + 1,
            name: `Item ${index + 1}`,
            type: index % 2 == 0 ? 1:2,
            sim: 'sim' + index,
            sim1: 'sim1' + index,
            sim2: 'sim2' + index,
            sim3: 'sim3' + index,
            sim4: 'sim4' + index,
            sim5: 'sim5' + index,
            sim6: 'sim6' + index,
            sim7: 'sim7' + index
            // 其他属性...
        }))
        return data
    }
    // 导出loading
    const [fetchLoading, setFetchLoading] = useState(false)
    // 导出时间
    const [count, setCount] = useState(0)
    // 导出数据量
    const [exportCount,] = useState(1000000)
    // 导出进度
    const [progress, setProgress] = useState(0)
    // 定时器ref
    const timerRef = useRef<any>()
    const column = [
        {title: 'ICCID', key: 'iccid',},
        {title: 'sim', key: 'sim',},
        {title: 'sim1', key: 'sim1',},
        {title: 'sim2', key: 'sim2',},
        {title: 'sim3', key: 'sim3',},
        {title: 'sim4', key: 'sim4',},
        {title: 'sim5', key: 'sim5',},
        {title: 'sim6', key: 'sim6',},
        {title: 'sim7', key: 'sim7',},
    ]


    const init = () => {
        setFetchLoading(false)
        setCount(0)
        setProgress(0)
        timerRef.current = undefined
    }


    return ( <Space direction='vertical'>
        <Input placeholder="为了验证页面是否会卡顿？"/> 
        <div>执行时间：{`执行了（${(count).toFixed(2)}）s！`}</div>
        <Progress                   
            percent={progress}
            style={{
                color: 'red',
            }}
            format={(percent) => percent?.toFixed(2) + '%'}
        />
        <Card title='导出配置' extra={<Space>
            <div>列数：{column?.length}列</div>
            <div>数量：{exportCount}条</div>
        </Space>}>
            <Button 
                loading={fetchLoading}
                type='primary'
                onClick={() => {
                    init()
                    const start = performance.now();
                    timerRef.current = setInterval(() => {
                        setCount((val) => Number(val||0) + 1)
                    }, 1000)
                    setFetchLoading(true)
                    exportFun({
                        allData: structureData(exportCount),
                        fileDataColumn: column,
                        filename: '失败清单.xlsx',
                        chunkSize: 800, // 切片范围
                        maxConcurrency: 30, // 并发数量
                        callback: () => {
                            setFetchLoading(false)
                            const end = performance.now();
                            const time = end - start
                            if (timerRef?.current) {
                                clearInterval(timerRef?.current)
                            }
                            console.log(`执行了（${(time / 1000).toFixed(2)}）s！`)
                        },
                        progressCallback: (progressData: number) => {
                            setProgress(progressData)
                        }
                    })
                }}>大批量数据导出</Button>
            </Card>
    </Space> );
}
 
export default ExportBtn;