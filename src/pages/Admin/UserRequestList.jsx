import React, { useEffect, useState } from "react";
import { Table, Tabs, Button, Tag, message, Tooltip } from "antd";
import axios from "axios";
import axiosInstance from "../../api/AxiosInstance"
const { TabPane } = Tabs;

const UserRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [planFilterOptions, setPlanFilterOptions] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/usersIntents");
        setRequests(response.data);

        const uniquePlans = [...new Map(response.data.map((req) => [req.plan.id, req.plan])).values()];
        setPlanFilterOptions(uniquePlans);
      } catch (error) {
        console.error("Error fetching user requests:", error);
        message.error("Error al cargar las solicitudes de usuarios.");
      }
    };

    fetchRequests();
  }, []);

  const updateRequestStatus = async (id, status) => {
    try {
      await axiosInstance.patch(`/usersIntents/${id}`, { status });
      message.success(`Solicitud ${status === "approved" ? "aprobada" : "rechazada"} con éxito.`);

      const response = await axios.get("/usersIntents");
      setRequests(response.data);
    } catch (error) {
      console.error("Error updating request status:", error);
      message.error("Error al actualizar la solicitud.");
    }
  };

  // Group requests by status
  const groupedRequests = {
    pending: requests.filter((req) => req.status === "pending"),
    approved: requests.filter((req) => req.status === "approved"),
    rejected: requests.filter((req) => req.status === "rejected"),
  };

  // Table columns
  const columns = [
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
      title: "Acciones",
      key: "actions",
      render: (_, record) =>
        record.status === "pending" && (
          <div className="flex gap-2">
            <Button
              type="primary"
              onClick={() => updateRequestStatus(record.id, "approved")}
            >
              Aprobar
            </Button>
            <Button
              type="danger"
              onClick={() => updateRequestStatus(record.id, "rejected")}
            >
              Rechazar
            </Button>
          </div>
        ),
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Solicitudes de Usuarios</h1>

      <Tabs defaultActiveKey="pending">
        <TabPane tab="Pendientes" key="pending">
          <Table
            dataSource={groupedRequests.pending}
            columns={columns}
            rowKey={(record) => record.id}
            bordered
            className="w-full"
          />
        </TabPane>
        <TabPane tab="Aprobados" key="approved">
          <Table
            dataSource={groupedRequests.approved}
            columns={columns.filter((col) => col.key !== "actions")} // Remove actions column
            rowKey={(record) => record.id}
            bordered
            className="w-full"
          />
        </TabPane>
        <TabPane tab="Rechazados" key="rejected">
          <Table
            dataSource={groupedRequests.rejected}
            columns={columns.filter((col) => col.key !== "actions")}
            rowKey={(record) => record.id}
            bordered
            className="w-full"
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserRequestList;
