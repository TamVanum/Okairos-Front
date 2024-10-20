import React from 'react';
import { Card, Dropdown, Button, Menu } from 'antd';
import { SettingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import attriburesMap from '../../utils/attributesMap';

const MetricCard = ({ metric, onEdit, onDelete }) => {
    const menuItems = [
        {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Editar',
            onClick: () => onEdit(metric),
        },
        {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: 'Eliminar',
            onClick: () => onDelete(metric.id),
        },
    ];

    return (
        <Card
            title={
                <div className="flex justify-between">
                    <span className='capitalize'>{metric.name}</span>
                    <Dropdown
                        menu={{ items: menuItems }}
                        trigger={['click']}
                    >
                        <Button type="text" icon={<SettingOutlined />} />
                    </Dropdown>
                </div>
            }
            bordered={true}
        >
            <p><strong>Flujo de agua:</strong> {metric.water_flow ? 'Sí' : 'No'}</p>
            {metric.attributes.map((attribute, idx) => (
                <div key={idx} className="flex justify-between">
                    <p><strong>{attriburesMap.get(attribute.name)}:</strong></p>
                    <p>{attribute.minimum} - {attribute.maximum} {attribute.unit_of_measurement}</p>
                </div>
            ))}
        </Card>
    );
};

export default MetricCard;
