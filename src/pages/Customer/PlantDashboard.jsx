import { Card, Flex } from "antd";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import MultiAxisLineChart from "../../components/Dashboard/HidroponicsChart";


const PlantDashboard = () => {
    return (
        <>
            <div className="flex flex-col lg:flex-row ">
                <Flex className="lg:w-3/4 flex items-center justify-center p-4">
                    <MultiAxisLineChart />
                </Flex>
                <Flex className="lg:w-1/4 flex items-center justify-center p-4" vertical gap={"2%"}>
                    <DashboardCard colorOption={1} title="Flujo del agua" value="Activo" />
                    <DashboardCard colorOption={2} title="Temperatura del agua" value="18.7 °C" />
                    <DashboardCard colorOption={3} title="Temperatura ambiente" value="31.3 °C" />
                    <DashboardCard colorOption={4} title="Nivel de ph" value="7.2" />
                    <DashboardCard colorOption={5} title="Conductividad" value="800 μS/cm" />
                </Flex>
            </div>
        </>
    );
}

export default PlantDashboard;