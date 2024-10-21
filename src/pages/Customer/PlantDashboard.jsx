import React, { useEffect, useState } from 'react';
import { Button, Card, Dropdown, Modal, QRCode, Spin, Typography } from "antd";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import MultiAxisLineChart from "../../components/Dashboard/HidroponicsChart";
import CustomSpedometer from "../../components/Dashboard/CustomSpedometer";
import 'tailwindcss/tailwind.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { LoadingOutlined, SettingOutlined } from '@ant-design/icons';
import axiosInstance from '../../api/AxiosInstance';
import MetricSelectionModal from '../../components/HydroponicsList/MetricSelectionModal';
import usePlantMetricsStore from "../../contexts/MetricsDataContext";

const socketUrl = import.meta.env.VITE_SOCKET_URL;

const scoket = io(socketUrl, {
    autoConnect: false,
    reconnection: false,
});

const PlantDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [msgData, setMsgData] = useState([]);
    const [metrics, setMetrics] = useState([]);
    const [selectedMetricData, setSelectedMetricData] = useState(null);
    const [selectedHydroponicId, setSelectedHydroponicId] = useState(null);
    const [isChangeMetricModalOpen, setIsChangeMetricModalOpen] = useState(false);
    const { hydroponicId } = useParams();
    const { currentCycle } = useParams();


    const [open, setOpen] = useState(false);

    const showQr = () => {
        setOpen(true);
    };

    const { plantMetricData, fetchPlantMetricsData, loading, error } = usePlantMetricsStore();

    // 1. Define `handleGetHydroponicMetrics` as a separate function
    const handleGetHydroponicMetrics = async () => {
        try {
            const response = await axiosInstance.get(`/hydroponic/metrics/${hydroponicId}/in-use`);
            setMetrics(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (hydroponicId) {
            if (!scoket.connected) {
                scoket.connect();
            }
            scoket.emit('joinRoom', currentCycle);
            const handleMessage = (msg) => {
                try {
                    console.log('Received JSON message:', msg);
                    if (msg && msg.message) {
                        setMsgData(msg.message);
                    }

                    setMessages(prevMessages => [...prevMessages, msg]);
                } catch (e) {
                    console.error(`error recibiendo el mensage en el dashboard`, e);
                }
            };

            scoket.on('message', handleMessage);

            return () => {
                scoket.off('message', handleMessage);
                scoket.emit('leaveRoom', hydroponicId);
                scoket.disconnect();
                console.log('Clean up and disconnect');
            }
        }
    }, [hydroponicId, currentCycle]);

    // Fetch hydroponic metrics on load
    useEffect(() => {
        handleGetHydroponicMetrics();
    }, [hydroponicId]);

    // Fetch plant metrics from Zustand store
    useEffect(() => {
        fetchPlantMetricsData();
    }, [fetchPlantMetricsData]);


    // 2. Update handleMetricChangeOk to call handleGetHydroponicMetrics after submission
    const handleMetricChangeOk = () => {
        const data = {
            "hydroponicId": hydroponicId,
            "plantMetricId": selectedMetricData.metricsId,
        };
        axiosInstance.post('/plant-metric-snapshot/add-metric', data)
            .then((response) => {
                if (response.status === 200) {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
        setIsChangeMetricModalOpen(false);
    };

    const handleMetricChangeCancel = () => {
        setIsChangeMetricModalOpen(false);
    };

    const handleChangeMetricCardClick = (metricItem) => {
        setSelectedMetricData({ metricsId: metricItem.id });
    };

    const showChangeMetricModal = () => {
        setIsChangeMetricModalOpen(true);
    };

    const menuItems = [
        {
            key: '1',
            label: <Button className='w-full' onClick={() => showChangeMetricModal()}>Cambiar Metricas</Button>,
        },
        {
            key: '2',
            label: <Button className="w-full bg-warning-500 hover:!bg-red-500" type='primary' onClick={() => scoket.emit('message', 'Hello from client')}>Finalizar Ciclo</Button>,
        },
        {
            key: '3',
            label: <Button className='w-full' type='primary' onClick={showQr}>Mostrar QR</Button>,
        },
    ];

    return (
        <>
            {msgData && Object.keys(msgData).length > 0 ? (
                <>
                    <div className="flex flex-col pt-3 px-6">
                        <Typography.Title level={3}>Dashboard de la planta </Typography.Title>
                    </div>
                    <div className='flex flex-row mt-2 px-6 gap-2'>
                        <Typography.Title level={5}>Metrica en uso: {metrics.name} </Typography.Title>
                        <Dropdown
                            className='ml-auto'
                            menu={{ items: menuItems }} // Replacing 'overlay' with 'menu'
                            trigger={['click']}
                        >
                            <Button
                                type="text"
                                icon={
                                    <SettingOutlined
                                        style={{ fontSize: '1.8rem' }}
                                        className={`text-warning-500 font-bold`}
                                    />
                                }
                            />
                        </Dropdown>
                    </div>
                    <hr className='mt-4' />
                    <div className="flex flex-col lg:flex-row p-4 gap-4">
                        <div className="lg:w-4/5 flex items-center justify-center p-4">
                            <MultiAxisLineChart />
                        </div>
                        <div className="lg:w-1/5 flex flex-col items-center justify-center p-2 gap-2">
                            <DashboardCard colorOption={1} title="Flujo del agua" value={msgData.water_flow ? 'Activo' : 'Inactivo'} />
                            <DashboardCard colorOption={2} title="Temperatura del agua" value={`${msgData.water_temperature} °C`} />
                            <DashboardCard colorOption={3} title="Temperatura ambiente" value={`${msgData.ambient_temperature} °C`} />
                            <DashboardCard colorOption={4} title="Nivel de pH" value={msgData.ph_level} />
                            <DashboardCard colorOption={5} title="Conductividad" value={`${msgData.electrical_conductivity} μS/cm`} />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 mt-6">
                        {metrics.attributes?.map((metric) => (
                            <div key={metric.name} className='flex flex-col text-center'>
                                <Typography.Text className='font-semibold text-lg' >{metric.name}</Typography.Text>
                                <CustomSpedometer value={parseFloat(msgData[metric.name])} minimum={metric.minimum} maximum={metric.maximum} />
                            </div>
                        ))}
                    </div>

                    <Card title="Métricas de la planta" className="w-full max-w-2xl mx-auto mt-4">
                        <div className="flex flex-col gap-4">
                            {metrics.attributes?.map((metric) => (
                                <div key={metric.name} className="flex justify-between">
                                    <p>{metric.name}</p>
                                    <p>{metric.minimum}</p>
                                    <p>{metric.maximum}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <MetricSelectionModal
                        isModalOpen={isChangeMetricModalOpen}
                        handleOk={handleMetricChangeOk}
                        handleCancel={handleMetricChangeCancel}
                        handleCardClick={handleChangeMetricCardClick}
                        selectedMetricData={selectedMetricData}
                        plantMetricData={plantMetricData}
                        selectedHydroponicId={selectedHydroponicId}
                    />
                </>
            ) : (
                <div className='flex justify-center items-center h-screen'>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </div>
            )}


            <Modal
                title={<Typography.Text level={4}>Código QR - Vinculo a hidroponico</Typography.Text>}
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}
                className='flex justify-center items-center'
            >
                <QRCode size={300} type='svg' value={`${hydroponicId}`} />
            </Modal>
        </>
    );
}

export default PlantDashboard;
