import { ConfigProvider, Table, Tag, Tooltip, Typography } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

const dataSource = [
    {
        key: '1',
        name: 'Mike',
        last_name: 'Doe',
        email: 'example1@gmail.com',
        application_date: 32,
    },
    {
        key: '2',
        name: 'John',
        last_name: 'Doe',
        email: 'example1@gmail.com',
        application_date: 42,
    },
];

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',

    },
    {
        title: 'Apellido',
        dataIndex: 'last_name',
        key: 'last_name',
        responsive: ['lg'],
    },
    {
        title: 'Correo',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Fecha de solicitud',
        dataIndex: 'application_date',
        key: 'application_date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.planting_date - b.planting_date,
    },
    {
        title: 'Plan',
        dataIndex: 'plan',
        key: 'plan',
        defaultSortOrder: 'descend',
    },
    {
        title: 'Detalle',
        dataIndex: 'detail',
        key: 'detail',
        render: () => (
            <Link to="/admin/user-request/1">
                <div className="flex items-center justify-center w-fit rounded-full bg-orange-400  hover:bg-orange-500 cursor-pointer">
                    <SearchOutlined className="text-3xl m-1.5 text-white" />
                </div>
            </Link>
        ),
    },
];

const UserRequestList = () => {
    return (
        // <ConfigProvider locale={customLocale}>
        <div className="flex justify-center rounded-xl">
            <div className="flex flex-col w-full  p-6 rounded-lg">
                <Typography.Title level={2}>Mis Plantas</Typography.Title>
                <Table className="w-full" dataSource={dataSource} columns={columns} />;
            </div>
        </div>
        // </ConfigProvider>
    );
}

export default UserRequestList;