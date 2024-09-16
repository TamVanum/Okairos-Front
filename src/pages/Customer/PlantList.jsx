import { Card, ConfigProvider, Modal, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined, ExclamationOutlined } from "@ant-design/icons";
import axiosInstance from "../../api/AxiosInstance";
import { useEffect, useState } from "react";
import attriburesMap from "../../utils/attributesMap";
import useAuthStore from "../../contexts/AuthContext";

const PlantList = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMetricData, setSelectedMetricData] = useState(null);
    const [selectedHydroponicId, setSelectedHydroponicId] = useState(null);

    const showModal = (hydroponicId) => {
        setSelectedHydroponicId(hydroponicId);
        setIsModalOpen(true);
    };

    const handleSetMetricData = async (hydroponicId, metricsId) => {
        const profileUpdateResponse = await axiosInstance.post('/users/me', { hydroponicId, metricsId });
    };

    const handleOk = () => {
        if (selectedMetricData != null) {
            console.log("Selected Hydroponic ID:", selectedMetricData.hydroponicId);
            console.log("Selected Metrics ID:", selectedMetricData.metricsId);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCardClick = (metricItem) => {
        // Guardamos tanto el hydroponicId (del estado) como el metricsId
        setSelectedMetricData({
            hydroponicId: selectedHydroponicId,
            metricsId: metricItem.id, // Aquí guardamos el ID de la métrica
        });
    };

    const [hydroponicData, setHydroponicData] = useState([]);
    const [plantMetricData, setPlantMetricData] = useState([]);

    useEffect(() => {

        const token = useAuthStore.getState().token;

        if (!token) {
            console.error("No hay token disponible. El usuario no está autenticado.");
            return;
        }

        const handleGetPlantMetricsData = async () => {
            try {
                const response = await axiosInstance.get("/plant-metric");
                const dataWithKeys = response.data.map((item, index) => ({
                    ...item,
                    key: index + 1,
                }));
                setPlantMetricData(dataWithKeys);
            } catch (error) {
                console.error(error);
            }
        };

        const handleGetHydroponicData = async () => {
            try {
                const response = await axiosInstance.get("/hydroponic/me");
                const dataWithKeys = response.data.map((item, index) => ({
                    ...item,
                    key: index + 1,
                }));
                setHydroponicData(dataWithKeys);
            } catch (error) {
                console.error(error);
            }
        };

        handleGetHydroponicData();
        handleGetPlantMetricsData();
    }, []);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Detalle',
            dataIndex: 'detail',
            key: 'detail',
            render: (text, record) => {
                if (record.currentPlantId) {
                    return (
                        <Link to={`/customer/plants/${record.id}`}>
                            <div className="flex items-center justify-center w-fit rounded-full bg-orange-400 hover:bg-primary-500 cursor-pointer">
                                <SearchOutlined className="text-3xl m-1.5 text-white" />
                            </div>
                        </Link>
                    );
                } else {
                    return (
                        <div
                            className="flex items-center justify-center w-fit rounded-full bg-orange-400 hover:bg-primary-500 cursor-pointer"
                            onClick={() => showModal(record.id)} // Aquí se pasa el hydroponicId al modal
                        >
                            <ExclamationOutlined className="text-3xl m-1.5 text-white" />
                        </div>
                    );
                }
            },
        },
    ];

    return (
        <>
            {hydroponicData.length > 0 && (
                <div className="flex justify-center rounded-xl">
                    <div className="flex flex-col w-full p-6 rounded-lg">
                        <Typography.Title level={2}>Mis Plantas</Typography.Title>
                        <Table className="w-full" dataSource={hydroponicData} columns={columns} />
                    </div>

                    <Modal title="Información" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <div>
                            {plantMetricData.map((metricItem) => (
                                <Card
                                    key={metricItem.id}
                                    className={`flex flex-col mb-4 cursor-pointer ${selectedMetricData?.metricsId === metricItem.id ? 'bg-primary-100' : 'hover:bg-primary-100'
                                        }`}
                                    onClick={() => handleCardClick(metricItem)} // Aquí se guarda solo metricItem, hydroponicId viene del estado
                                    style={{
                                        transition: 'background-color 0.3s',
                                    }}
                                >
                                    <Typography.Title level={5} className="capitalize">{metricItem.name}</Typography.Title>
                                    <div className="flex flex-col">
                                        {metricItem.attributes.map((attr) => (
                                            <div key={metricItem.id}>
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
                </div>
            )}
        </>
    );
};

export default PlantList;
