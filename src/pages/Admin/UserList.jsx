import React, { useEffect, useState } from "react";
import { Table, Button, Tag, message, Tooltip, Switch } from "antd";
import axiosInstance from "../../api/AxiosInstance";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [planFilterOptions, setPlanFilterOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/users");
      setUsers(response.data);

      const uniquePlans = [
        ...new Map(response.data.map((user) => [user.plan.id, user.plan])).values(),
      ];
      setPlanFilterOptions(uniquePlans);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Error al cargar los usuarios.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Enable or disable a user
  const toggleUserStatus = async (userId, isActive) => {
    try {
      await axiosInstance.patch(`/users/${userId}`, { isActive });
      message.success(`Usuario ${isActive ? "habilitado" : "deshabilitado"} con éxito.`);
      fetchUsers(); // Refresh users
    } catch (error) {
      console.error("Error updating user status:", error);
      message.error("Error al actualizar el estado del usuario.");
    }
  };

  // Filter users by role
  const roleFilters = [
    { text: "Administrador", value: true },
    { text: "Usuario", value: false },
  ];

  // Filter users by activity status
  const statusFilters = [
    { text: "Habilitado", value: true },
    { text: "Deshabilitado", value: false },
  ];

  // Table columns
  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) =>
        avatar.startsWith("http") ? (
          <img src={avatar} alt="Avatar" style={{ width: 40, height: 40, borderRadius: "50%" }} />
        ) : (
          <div className="w-10 h-10 bg-gray-300 text-center flex items-center justify-center rounded-full">
            {avatar}
          </div>
        ),
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apellido",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      filters: planFilterOptions.map((plan) => ({
        text: `${plan.title} (${plan.price} ${plan.period})`,
        value: plan.id,
      })),
      onFilter: (value, record) => record.plan.id === value,
      render: (plan) => (
        <Tooltip title={`Capacidad: ${plan.hydroponicCapacity} hidroponicos`}>
          <Tag color="blue">
            {plan.title} ({plan.price} {plan.period})
          </Tag>
        </Tooltip>
      ),
    },
    {
      title: "Rol",
      dataIndex: "isAdmin",
      key: "isAdmin",
      filters: roleFilters,
      onFilter: (value, record) => record.isAdmin === value,
      render: (isAdmin) => (
        <Tag color={isAdmin ? "gold" : "green"}>{isAdmin ? "Administrador" : "Usuario"}</Tag>
      ),
    },
    {
      title: "Estado",
      dataIndex: "isActive",
      key: "isActive",
      filters: statusFilters,
      onFilter: (value, record) => record.isActive === value,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>{isActive ? "Habilitado" : "Deshabilitado"}</Tag>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Switch
            checked={record.isActive}
            onChange={(checked) => toggleUserStatus(record.id, checked)}
            checkedChildren="Habilitado"
            unCheckedChildren="Deshabilitado"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      <Table
        dataSource={users}
        columns={columns}
        rowKey={(record) => record.id}
        bordered
        loading={isLoading}
        className="w-full bg-bgContainer2-100 rounded-xl"
      />
    </div>
  );
};

export default UserList;
