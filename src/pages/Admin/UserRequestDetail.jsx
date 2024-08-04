import React, { useState } from 'react';
import { Card, Tag, Typography } from 'antd';
import 'tailwindcss/tailwind.css';

const { Title, Text } = Typography;

const UserRequestDetail = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='flex flex-col items-center mt-8'>
      <div className="flex justify-end w-9/12">
        <Title level={2} className="text-end">
          {isActive ? <span className='text-green-700'>Activo</span> : <span className='text-red-700'>Inactivo</span>}
        </Title>
      </div>
      <div className="flex h-full w-9/12 lg:flex-row gap-4 mt-4">
        <div className="lg:w-1/2 flex items-center justify-center">
          <Card title={<Title level={3}>Información de Usuario</Title>} className="w-full max-w-full shadow-lg">
            <p>Nombre: Juan Pérez</p>
            <p>Edad: 28</p>
            <p>Ocupación: Ingeniero de Software</p>
            <p>Tipo de Plan: <Tag color="volcano">Volcano</Tag></p>
          </Card>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center">
          <Card title={<Title level={3}>Información de contacto</Title>} className="w-full max-w-full shadow-lg">
            <p>Teléfono: +1 234 567 890</p>
            <p>Email: juan.perez@example.com</p>
            <p>Dirección: 123 Calle Falsa, Ciudad, País</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserRequestDetail;
