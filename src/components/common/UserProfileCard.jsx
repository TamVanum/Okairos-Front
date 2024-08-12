import React from 'react';
import { Avatar, Typography, Tag, Tooltip, Button, Image } from 'antd';
import 'tailwindcss/tailwind.css';
import { useUser } from '../../hooks/useUser';
import { Link } from 'react-router-dom';

const UserProfileCard = ({ collapsed }) => {

    const user = useUser();
    return (
        <div className={`flex w-full flex-col items-start justify-end h-fit bg-cover bg-center ${collapsed ? "mt-4" : "bg-primary-500 p-4"} rounded-xl`}>
            <div className={`flex justify-between ${collapsed ? "" : "w-full"}`}>
                <Link to={"/customer/profile"} >
                    <Avatar
                        className="bg-error-400 mb-2"
                        size={56}
                        src={user.avatar.length > 1 ? user.avatar : null}
                    >
                        {user.avatar.length == 1 && (
                            <Typography className="text-2xl text-white">{user.avatar}</Typography>
                        )}
                    </Avatar>
                </Link>
                {!collapsed && (
                    <Tooltip placement="rightTop" title={"Plan ql pro"}>
                        <Tag color="purple" className="h-fit">Plan</Tag>
                    </Tooltip>
                )}
            </div>
            <div className="flex flex-row items-center">
                {!collapsed && (
                    <>
                        <Typography className="text-white font-medium">{user.name} {user.lastname}</Typography>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfileCard;