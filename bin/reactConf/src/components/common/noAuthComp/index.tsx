import { useEffect, useState } from "react";
import { Navigate, Outlet, } from "react-router-dom";
import { router } from '@/route/index.js'

const NoAuthComp = () => {
    const [authRoutes, setAuthRoutes] = useState<any>();

    const flattenTree = (tree: any): any[] => {
        let results: any[] = []
        function flatten(node: any) {
            if (node.path) {
                results.push(node);
            }
            if (node.children) {
                for (let child of node.children) {
                    flatten(child);
                }
            }
        }
        for (let node of tree) {
            flatten(node);
        }
        return results;
    }
    useEffect(() => {
        // 数据扁平化处理 - 得到需要鉴权的路径
        const paths = flattenTree(router?.routes)?.filter((item: any) => !item?.isAuth)?.map(i => '/' + i.path)
        setAuthRoutes(paths)
    }, [])

    {/* 需要鉴权的页面 且未登录 直接访问， 其他直接跳转登录页面 */}
    return authRoutes ? 
    (authRoutes.includes(location?.pathname)? <Outlet /> : <Navigate to="/login" />):'加载中...';
}
 
export default NoAuthComp;