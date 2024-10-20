import React from 'react';
import { Link } from 'react-router-dom';
import { DesktopOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';



export const menuItems = [
    {
        key: '1',
        icon: <PieChartOutlined />,
        label: <Link to="/admin">Home</Link>,
    },
    {
        key: '2',
        icon: <UserOutlined />,
        label: <Link to="/admin/profile">Mi Perfil</Link>,
    },
    {
        key: '3',
        icon: <DesktopOutlined />,
        label: <Link to="/admin/user-request">Peticiones de Usuarios</Link>,
    },
    {
        key: '4',
        icon: <DesktopOutlined />,
        label: <Link to="/admin/users">Usuarios</Link>,
    },
    {
        key: '5',
        icon: <DesktopOutlined />,
        label: <Link to="/admin/plans">Planes</Link>,
    },
];