/**
 * @param {*} props The properties of the component.
 */
import { Button, Card, Layout, Menu, Space, theme } from "antd";

import { useOutlet , useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/store/isLoginReducer";
import { router } from '@/route/index.js'
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import NoAuthComp from '@/components/common/noAuthComp';
import Index from "@/pages/index";


const Layouts = () => {
    const navigate = useNavigate();
    let location = useLocation();
    const { pathname } = useLocation()
    const outlet = useOutlet()  
    const [collapsed, setCollapsed] = useState(false);
    const {isLogin} = useSelector((state: any) => state.login)
    const dispatch = useDispatch()

    const jumpHandler = (path: string) => {
        navigate(path)
    }
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // 过滤掉不需要展示在 菜单的 路由
    const filterRoutes = (routes: any[]): any[] => {
        return routes.reduce((acc, route) => {
          if (!route.hideMenu) {
            const children = route.children ? filterRoutes(route.children) : [];
            if (children.length > 0) {
              route.children = children;
            }
            acc.push(route);
          }
          return acc;
        }, [] as any[]);
    }

    const formatTree = (tree: any) => {
        return tree.map((item: any) => {
          const { path, title, children } = item;
          const formattedItem: any = { key: path, icon: children?<UserOutlined />:undefined, label: title };
      
          if (children && children.length > 0) {
            formattedItem.children = formatTree(children);
          }
      
          return formattedItem;
        });
      }
  
    return (
        isLogin?
        // 登录进入则系统
        <Layout title="欢迎使用xx系统！">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" onClick={() => navigate("/")}>{!collapsed?'欢迎使用xx系统！':'xxxx'}</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    //   defaultSelectedKeys={['1']}
                    items={formatTree(filterRoutes(router?.routes))}
                    onClick={({key}) => {
                        navigate(key)
                    }}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer,}}>
                    <Space direction='horizontal' style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 20px 0 0'
                    }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                            }}
                        />
                        <>
                            <Button type='primary' onClick={() => {
                                dispatch(logOut(isLogin))
                                navigate('/login')
                            }}>退出登陆</Button>
                        </>
                    </Space>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Card>
                        <div>
                            {location.pathname !=='/'? outlet : <Index />}
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
        :
        // 未登录情况 访问 - 若访问无需授权（auth）的组件, 直接展示，否则重定向至 登录页面
        <NoAuthComp />
    );
}
 
export default Layouts;