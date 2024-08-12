import React, { useRef } from 'react';
import { Avatar, Tag, Tooltip, Typography, Button, Image } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';

const UserProfile = ({ user, onEditAvatar }) => {
  const fileInputRef = useRef(null);
  // const { user } = useAuth();

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col w-full items-center justify-end h-fit bg-cover bg-center p-4 bg-primary-500 rounded-xl">
      <div className="relative">
        {/* {user.avatar.length > 1 ? <Image src={user.avatar} alt="Avatar" /> : user } */}
        <Avatar
          className="bg-error-400 mb-2"
          size={100}
          src={user.avatar.length > 1 ? <Image src={user.avatar} /> : null}
        >
          {user.avatar.length == 1 && (
            <Typography className="text-2xl text-white">{user.avatar}</Typography>
          )}
        </Avatar>
        <Button
          className="absolute bottom-0 right-0"
          shape="circle"
          icon={<EditOutlined />}
          onClick={handleAvatarClick}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={onEditAvatar}
        />
      </div>
      <div className="flex flex-row items-center mt-2">
        <Typography className="text-white">{user.name} {user.lastname}</Typography>
        <Tooltip placement="rightTop" title={"Plan ql pro"}>
          <Tag color="blue" className="ml-4">Plan</Tag>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserProfile;