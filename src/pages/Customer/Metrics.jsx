import React, { useState, useEffect } from 'react';
import { Input, Modal, Spin } from 'antd';
import axiosInstance from '../../api/AxiosInstance';
import AddMetricModal from '../../components/Metrics/AddMetricModal';
import EditMetricModal from '../../components/Metrics/EditMetricModal';
import MetricCard from '../../components/Metrics/MetricCard';
import usePlantMetricsStore from '../../contexts/MetricsDataContext';
import { LoadingOutlined } from '@ant-design/icons';

const { Search } = Input;
const { confirm } = Modal;

const Metrics = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedMetric, setSelectedMetric] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [metricsActionsCounter, setMetricsActionsCounter] = useState(0);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const { plantMetricData, fetchPlantMetricsData, loading, error } = usePlantMetricsStore();

    useEffect(() => {
        fetchPlantMetricsData();
    }, [fetchPlantMetricsData, metricsActionsCounter]);


    const handleAddMetric = async (newMetric) => {
        try {
            await axiosInstance.post('/plant-metric', newMetric);
            setMetricsActionsCounter(metricsActionsCounter + 1);
        } catch (error) {
            console.error('Error adding metric:', error);
        }
    };

    const handleDeleteMetric = async (id) => {
        try {
            await axiosInstance.delete(`/plant-metric/${id}`);
            setMetricsActionsCounter(metricsActionsCounter + 1);
        } catch (error) {
            console.error('Error deleting metric:', error);
        }
    };

    const showDeleteConfirm = (id) => {
        confirm({
            title: '¿Estás seguro de que deseas eliminar esta métrica?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                handleDeleteMetric(id);
            },
            onCancel() {
                console.log('Cancel delete');
            },
        });
    };

    const handleEditMetric = (metric) => {
        setSelectedMetric(metric);
        setIsEditModalVisible(true);
    };

    const handleUpdateMetric = async (updatedMetric) => {
        try {
            await axiosInstance.patch(`/plant-metric/${updatedMetric.id}`, updatedMetric);
            setMetricsActionsCounter(metricsActionsCounter + 1);
        } catch (error) {
            console.error('Error updating metric:', error);
        }
    };

    return (
        <>
            {loading ?
                <div className='flex justify-center items-center h-screen'>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </div>
                :
                <div className="p-10">

                    <div className="flex flex-col sm:flex-row justify-between mb-6">
                        <Search
                            placeholder="Buscar métricas..."
                            onChange={handleSearchChange}
                            value={searchText}
                            enterButton
                            className="max-w-lg mb-4 sm:mb-0"
                        />
                        <AddMetricModal onAddMetric={handleAddMetric} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plantMetricData
                            .filter(metric =>
                                metric.name?.toLowerCase().includes(searchText.toLowerCase())
                            )
                            .map((metric, index) => (
                                <MetricCard
                                    key={index}
                                    metric={metric}
                                    onEdit={handleEditMetric}
                                    onDelete={() => showDeleteConfirm(metric.id)}
                                />
                            ))}
                    </div>

                    <EditMetricModal
                        visible={isEditModalVisible}
                        onClose={() => setIsEditModalVisible(false)}
                        metric={selectedMetric}
                        onUpdateMetric={handleUpdateMetric}
                    />
                </div>
            }
        </>
    );
};

export default Metrics;
