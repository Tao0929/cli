
import ExportBtn from '@/components/business/exportComp';
import Layouts from '@/components/common/layouts/index.js';
import LoginComp from '@/components/common/loginComp';
import NotFound from '@/components/common/notFound';
import Index from '@/pages/index';
import { Card } from 'antd';
import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
/**
 * 路由配置: 自定义用于业务使用
 * isAuth: 是否鉴权
 * hideMenu: 菜单隐藏
 * title: 路由标题
 */
type NewRouteObject =  { isAuth?: boolean, hideMenu?: boolean, title?: string } & RouteObject;

export const router = createBrowserRouter([
    {
      path: "/login",
      title: '登录',
      element: <LoginComp />,
      hideMenu: true,
      isAuth: false,
    },
    // layout - 根路由
    {
      path: "/",
      element: <Layouts />,
      title: '测试菜单',
      children: [
        {
          path: "dashboard",
          title: '仪表盘',
          element: <Card title="仪表盘(无需登录)">
            <ExportBtn />
          </Card>,
          isAuth: false,
        },
        {
          path: "about",
          title: '关于',
          element: <Card title="about">关于(需登录)</Card>,
          isAuth: true,
        },
        {
          path: "hideMenu",
          title: '隐藏不展示',
          element: <Card title="隐藏不展示">隐藏不展示</Card>,
          hideMenu: true,
        },
      ] as NewRouteObject[],
    },
    {
      path: "/notFound",
      title: '找不到404',
      element: <NotFound />,
      hideMenu: true,
      isAuth: false,
    },
    {
      path: "*",
      title: '404',
      element: <Navigate to="/notFound" />,
      hideMenu: true,
    },
  ] as NewRouteObject[]);

  