import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import temporalLogo from '../assets/react.svg';

const { Header, Content, Footer } = Layout;

const items = [
    {
        key: 1,
        label: 'nav 1',
    },
    {
        key: 2,
        label: 'nav 2',
    },
]

const LandingLayout = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Header className='bg-bgContainer-200 ' style={{ display: 'flex', alignItems: 'center' }}>
                <img className="h-fit sm:ml-2 md:ml20 lg:ml-20 mr-4" src={temporalLogo} alt="Logo" />
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Content className='mt-12 md:mx-20 lg:mx-20' style={{ padding: '0 48px' }}>
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default LandingLayout;