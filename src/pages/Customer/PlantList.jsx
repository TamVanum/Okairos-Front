import { Button, Card, ConfigProvider, Spin, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined, ExclamationOutlined, LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import MetricSelectionModal from "../../components/HydroponicsList/MetricSelectionModal";
import { useNavigate } from "react-router-dom";
import usePlantMetricsStore from "../../contexts/MetricsDataContext";
import axiosInstance from "../../api/AxiosInstance";

const PlantList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMetricData, setSelectedMetricData] = useState(null);
    const [selectedHydroponicId, setSelectedHydroponicId] = useState(null);

    const [hydroponicData, setHydroponicData] = useState([]);

    const navigate = useNavigate();

    // Zustand store
    const { plantMetricData, fetchPlantMetricsData, loading, error } = usePlantMetricsStore();

    useEffect(() => {
        const handleGetHydroponicData = async () => {
            try {
                const response = await axiosInstance.get("/hydroponic/me");
                const dataWithKeys = response.data.map((item, index) => ({
                    ...item,
                    key: index + 1,
                    active: item.active ? "Activo" : "Inactivo",
                }));
                setHydroponicData(dataWithKeys);
            } catch (error) {
                console.error(error);
            }
        };

        handleGetHydroponicData();
        fetchPlantMetricsData();
    }, [fetchPlantMetricsData]);

    const showModal = (hydroponicId) => {
        setSelectedHydroponicId(hydroponicId);
        setIsModalOpen(true);
    };

    const handleSetMetricData = async (hydroponicId, metricsId) => {
        const profileUpdateResponse = await axiosInstance.post('/users/me', { hydroponicId, metricsId });
    };

    const handleOk = () => {
        if (selectedMetricData != null) {
            const data = {
                "hydroponicId": selectedMetricData.hydroponicId,
                "metricId": selectedMetricData.metricsId,
            };
            axiosInstance.post('/hydroponic/new-cycle', data)
                .then((response) => {
                    if (response.status === 201) {
                        navigate(`/customer/plants/${selectedMetricData.hydroponicId}/${response.data}`);
                    }
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCardClick = (metricItem) => {
        setSelectedMetricData({
            hydroponicId: selectedHydroponicId,
            metricsId: metricItem.id,
        });
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Estado',
            dataIndex: 'active',
            key: 'active',
        },
        {
            title: 'Detalle',
            dataIndex: 'detail',
            key: 'detail',
            render: (text, record) => {
                if (record.active === "Activo") {
                    return (
                        <Link to={`/customer/plants/${record.id}/${record.currentCycle}`}>
                            <div className="flex items-center justify-center w-fit rounded-full bg-orange-400 hover:bg-primary-500 cursor-pointer">
                                <SearchOutlined className="text-3xl m-1.5 text-white" />
                            </div>
                        </Link>
                    );
                } else {
                    return (
                        <div
                            className="flex items-center justify-center w-fit rounded-full bg-orange-400 hover:bg-primary-500 cursor-pointer"
                            onClick={() => showModal(record.id)}
                        >
                            <ExclamationOutlined className="text-3xl m-1.5 text-white" />
                        </div>
                    );
                }
            },
        },
    ];

    if (loading) return <div className='flex justify-center items-center h-screen'>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
        <div className="mx-16 my-20">
            {hydroponicData.length > 0 && (
                <div className="flex justify-center rounded-xl">
                    <div className="flex flex-col w-full rounded-lg">
                        <Typography.Title level={2}>Mis Plantas</Typography.Title>
                        <Table className="w-full" dataSource={hydroponicData} columns={columns} />
                    </div>

                    <MetricSelectionModal
                        isModalOpen={isModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        handleCardClick={handleCardClick}
                        selectedMetricData={selectedMetricData}
                        plantMetricData={plantMetricData} // Now comes from Zustand
                        selectedHydroponicId={selectedHydroponicId}
                    />
                </div>
            )}
        </div>
    );
};

export default PlantList;
