import React, { useState } from 'react';
import { Button, Card, Modal, Typography } from 'antd';
import { ExclamationOutlined } from '@ant-design/icons';
import attriburesMap from '../../utils/attributesMap';
import Search from 'antd/es/transfer/search';

const MetricSelectionModal = ({
    isModalOpen,
    handleOk,
    handleCancel,
    handleCardClick,
    selectedMetricData,
    plantMetricData,
    selectedHydroponicId
}) => {


    const [searchText, setSearchText] = useState('');
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };


    return (
        <Modal title="Información" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div>
                <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                    <Search
                        placeholder="Buscar métricas..."
                        onChange={handleSearchChange}
                        value={searchText}
                        enterButton
                        className="max-w-lg mb-4 sm:mb-0"
                    />
                    <Button type="dashed" size="middle" shape='round' >Nueva Metrica</Button>
                </div>
                {plantMetricData.filter(metric =>
                    metric.name?.toLowerCase().includes(searchText.toLowerCase())
                ).map((metricItem, index) => (
                    <Card
                        key={index}
                        className={`flex flex-col mb-4 cursor-pointer ${selectedMetricData?.metricsId === metricItem.id ? 'bg-primary-100' : 'hover:bg-primary-100'
                            }`}
                        onClick={() => handleCardClick(metricItem)} // Pass metricItem as clicked card
                        style={{
                            transition: 'background-color 0.3s',
                        }}
                    >
                        <Typography.Title level={5} className="capitalize">{metricItem.name}</Typography.Title>
                        <div className="flex flex-col">
                            {metricItem.attributes.map((attr, idx) => (
                                <div key={idx}>
                                    <span>
                                        {attriburesMap.get(attr.name)} - Mínimo: {attr.minimum} - Máximo: {attr.maximum}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </Modal>
    );
};

export default MetricSelectionModal;
