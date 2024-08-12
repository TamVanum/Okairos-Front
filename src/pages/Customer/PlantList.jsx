import { ConfigProvider, Table, Tag, Tooltip, Typography } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";


const dataSource = [
    {
        key: '1',
        name: 'Mike',
        type: 'Planta de interior',
        planting_date: 32,
    },
    {
        key: '2',
        name: 'John',
        type: 'Planta de exterior',
        planting_date: 42,

    },
];

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',

    },
    {
        title: 'Tipo',
        dataIndex: 'type',
        key: 'type',
        responsive: ['lg'],
    },
    {
        title: 'Fecha de plantado',
        dataIndex: 'planting_date',
        key: 'planting_date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.planting_date - b.planting_date,
    },
    {
        title: 'Detalle',
        dataIndex: 'detail',
        key: 'detail',
        render: () => (
            <Link to="/customer/plants/1">
                <div className="flex items-center justify-center w-fit rounded-full bg-orange-400  hover:bg-primary-500 cursor-pointer">
                    <SearchOutlined className="text-3xl m-1.5 text-white" />
                </div>
            </Link>
        ),
    },
];

const PlantList = () => {
    return (
        // <ConfigProvider locale={customLocale}>
        <div className="flex justify-center rounded-xl">
            <div className="flex flex-col w-full  p-6 rounded-lg bg">
                <Typography.Title level={2}>Mis Plantas</Typography.Title>
                <Table className="w-full bg" dataSource={dataSource} columns={columns} />
            </div>
        </div>
        // </ConfigProvider>
    );
}

export default PlantList;