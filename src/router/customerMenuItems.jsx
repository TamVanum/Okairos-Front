import React from 'react';
import { Link } from 'react-router-dom';
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';



export const menuItems = [
    {
        key: '1',
        icon: <PieChartOutlined />,
        label: <Link to="/customer">Home</Link>,
    },
    {
        key: '2',
        icon: <UserOutlined />,
        label: <Link to="/customer/profile">Mi Perfil</Link>,
    },
    {
        key: '3',
        icon: <DesktopOutlined />,
        label: <Link to="/customer/plants">Mis Plantas</Link>,
    },
    {
        key: '4',
        icon: <DesktopOutlined />,
        label: <Link to="/customer/metrics">Mis Metricas</Link>,
    },
];