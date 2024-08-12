import React from 'react';
import { Card } from "antd";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import MultiAxisLineChart from "../../components/Dashboard/HidroponicsChart";
import CustomSpedometer from "../../components/Dashboard/CustomSpedometer";
import 'tailwindcss/tailwind.css';

const PlantDashboard = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row p-4 gap-4">
                <div className="lg:w-4/5 flex items-center justify-center p-4 lg:-mt-24">
                    <MultiAxisLineChart />
                </div>
                <div className="lg:w-1/5 flex flex-col items-center justify-center p-2 gap-2">
                    <DashboardCard colorOption={1} title="Flujo del agua" value="Activo" />
                    <DashboardCard colorOption={2} title="Temperatura del agua" value="18.7 °C" />
                    <DashboardCard colorOption={3} title="Temperatura ambiente" value="31.3 °C" />
                    <DashboardCard colorOption={4} title="Nivel de ph" value="7.2" />
                    <DashboardCard colorOption={5} title="Conductividad" value="800 μS/cm" />
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-10 mt-10">
                <CustomSpedometer value={50} />
                <CustomSpedometer value={60} />
                <CustomSpedometer value={70} />
                <CustomSpedometer value={80} />
            </div>
            <div className="flex flex-wrap justify-center lg:gap-x-96 lg:-m-24">
                <CustomSpedometer value={90} />
                <CustomSpedometer value={100} />
            </div>
        </>
    );
}

export default PlantDashboard;