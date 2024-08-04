import React, { useState } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme, Tooltip } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import UserProfileCard from '../components/common/UserProfileCard';
import temporalLogo from '../assets/react.svg';

const { Header, Content, Sider } = Layout;

const menuItems = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: <Link to="/customer/profile">Mi Perfil</Link>,
    },
    {
        key: '2',
        icon: <PieChartOutlined />,
        label: <Link to="/customer">Dashboard</Link>,
    },
    {
        key: '3',
        icon: <DesktopOutlined />,
        label: <Link to="/customer/plants">Mis Plantas</Link>,
    },
];

const CustomerLayout = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [themeState, setThemeState] = useState("light");

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const siderWidth = collapsed ? 80 : 250;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                breakpoint="lg"
                collapsedWidth={isMobile ? "0" : "80"}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                onBreakpoint={(broken) => {
                    setIsMobile(broken);
                }}
                theme={themeState}
                width={siderWidth}
                style={{ position: 'fixed', height: '100vh', borderRight: '1px solid grey' }}
            >
                <div className="flex flex-col items-center p-4">
                    <UserProfileCard collapsed={collapsed} />
                </div>
                <Menu theme={themeState} defaultSelectedKeys={['1']} mode="inline" items={menuItems} />
            </Sider>
            <Layout className='bg-gray-50' style={{ marginLeft: isMobile && collapsed ? 0 : siderWidth, transition: 'margin-left 0.2s' }}>
                <div className="flex my-4 mx-4 bg-orange-500 rounded-lg p-6 items-center justify-between">
                    <img className="h-fit" src={temporalLogo} alt="Logo" />
                    <Tooltip title="Cerrar Sesion">
                        <div className="flex items-center justify-center rounded-full bg-white hover:bg-gray-300 cursor-pointer">
                            <LogoutOutlined className="text-3xl m-1.5 text-orange-500" />
                        </div>
                    </Tooltip>
                </div>
                <Content className='bg-white rounded-lg mx-4' style={{ paddingTop: 64 }}>
                    <div className='-mt-12'>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default CustomerLayout;