import { SearchOutlined } from "@ant-design/icons";
import { Table, Typography } from "antd";
import { Link } from "react-router-dom";


const UserList = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            last_name: 'Doe',
            email: 'example1@gmail.com',
            plan: 'Plan Basico',
            state: 'Activo',
            application_date: 32,
        },
        {
            key: '2',
            name: 'John',
            last_name: 'Doe',
            email: 'example1@gmail.com',
            plan: 'Plan Pro',
            state: 'Inactivo',
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
            title: 'Estado',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Detalle',
            dataIndex: 'detail',
            key: 'detail',
            render: () => (
                <Link to="/admin/user-request/1">
                    <div className="flex items-center justify-center w-fit rounded-full bg-orange-400  hover:bg-primary-500 cursor-pointer">
                        <SearchOutlined className="text-3xl m-1.5 text-white" />
                    </div>
                </Link>
            ),
        },
    ];
    return (
        <div className="flex justify-center rounded-xl">
            <div className="flex flex-col w-full  p-6 rounded-lg">
                <Typography.Title level={2}>Mis Plantas</Typography.Title>
                <Table className="w-full" dataSource={dataSource} columns={columns} />;
            </div>
        </div>
    )
}

export default UserList;