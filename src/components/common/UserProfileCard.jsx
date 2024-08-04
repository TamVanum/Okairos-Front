import React from 'react';
import { Avatar, Typography, Tag, Tooltip, Button } from 'antd';
import 'tailwindcss/tailwind.css';

const UserProfileCard = ({ collapsed }) => {

    return (
        <div className={`flex w-full flex-col items-start justify-end h-fit bg-cover bg-center ${collapsed ? "mt-4" : "bg-orange-500 p-4"} rounded-xl`}>
            <div className={`flex justify-between ${collapsed ? "": "w-full"}`}>
                <Avatar className="bg-purple-500 mb-2" size={56} src={<img src='https://www.thoughtco.com/thmb/0SGYVQodewCH8H9tOFqqYhKLrsM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mike-tyson-kicks-off-australia-speaking-tour-in-brisbane-156502182-5ce081ba44f640c8955e51aa1a939341.jpg' />}>N</Avatar>
                {!collapsed && (
                    <Tooltip placement="rightTop" title={"Plan ql pro"}>
                        <Tag color="purple" className="h-fit">Plan</Tag>
                    </Tooltip>
                )}
            </div>
            <div className="flex flex-row items-center">
                {!collapsed && (
                    <>
                        <Typography className="text-white font-medium">Nombre de usuario</Typography>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfileCard;