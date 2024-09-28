import React, { useEffect, useState } from 'react';
import { Button, Card, Spin, Typography } from "antd";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import MultiAxisLineChart from "../../components/Dashboard/HidroponicsChart";
import CustomSpedometer from "../../components/Dashboard/CustomSpedometer";
import 'tailwindcss/tailwind.css';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import axiosInstance from '../../api/AxiosInstance';

const scoket = io('http://localhost:3000', {
    autoConnect: false,
    reconnection: false,
});

const PlantDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [msgData, setMsgData] = useState([]);
    const [metrics, setMetrics] = useState([]);
    const { hydroponicId } = useParams();
    const { currentCycle } = useParams();

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
    }, []);

    useEffect(() => {
        const handleGetHydroponicMetrics = async () => {
            try {
                const response = await axiosInstance.get(`/hydroponic/metrics/${hydroponicId}/in-use`);
                setMetrics(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        handleGetHydroponicMetrics();
    }, []);

    return (
        <>
            {msgData && Object.keys(msgData).length > 0 ? (
                <>
                    <div className="flex flex-col pt-3 px-6">
                        <Typography.Title level={2}>Dashboard de la planta </Typography.Title>
                        {/* <Typography.Text>Id de la planta: {hydroponicId}</Typography.Text> */}
                        <Button className='w-fit mt-2' onClick={() => scoket.emit('message', 'Hello from client')}>Cambiar Metricas</Button>
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
                        {metrics.attributes.map((metric) => (
                            <div key={metric.name} className='flex flex-col text-center'>
                                <Typography.Text className='font-semibold text-lg' >{metric.name}</Typography.Text>
                                <CustomSpedometer value={parseFloat(msgData[metric.name])} minimum={metric.minimum} maximum={metric.maximum} />
                            </div>
                        ))}
                    </div>

                    <Card title="Métricas de la planta" className="w-full max-w-2xl mx-auto mt-4">
                        <div className="flex flex-col gap-4">
                            {metrics.attributes.map((metric) => (
                                <div key={metric.name} className="flex justify-between">
                                    <p>{metric.name}</p>
                                    <p>{metric.minimum}</p>
                                    <p>{metric.maximum}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* <h2>Messages Received:</h2>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>
                                {typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg}
                            </li>
                        ))}
                    </ul> */}

                </>
            ) : (
                <div className='flex justify-center items-center h-screen'>
                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                </div>
            )}
        </>
    );
}

export default PlantDashboard;