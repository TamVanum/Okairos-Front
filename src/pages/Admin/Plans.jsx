import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import axios from "axios";
import axiosInstance from '../../api/AxiosInstance';
const { Option } = Select;

const PlansMaintainer = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const iframeRef = useRef(null);

  // Fetch plans from API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get("/plans");
        setPlans(response.data);
      } catch (error) {
        console.error("Error al cargar los planes:", error);
        message.error("Error al cargar los planes.");
      }
    };

    fetchPlans();
  }, []);

  // Open modal for editing
  const openEditModal = (plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  // Save changes
  const saveChanges = async (values) => {
    try {
      await axios.patch(`http://localhost:3000/api/plans/${editingPlan.id}`, values);
      message.success("¡Plan actualizado con éxito!");

      // Reload the entire page
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar el plan:", error);
      message.error("Error al actualizar el plan.");
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  // Table columns
  const columns = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Subtítulo",
      dataIndex: "subtitle",
      key: "subtitle",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Período",
      dataIndex: "period",
      key: "period",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Button type="primary" onClick={() => openEditModal(record)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Administrador de Planes</h1>

      <div className="overflow-x-auto">
        <Table
          dataSource={plans}
          columns={columns}
          rowKey={(record) => record.id}
          bordered
          scroll={{ x: 800 }}
          className="w-full"
        />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Vista previa de la página de planes</h2>
        <iframe
          ref={iframeRef}
          src="http://localhost:4321/#plans"
          className="w-full h-[700px] border border-gray-300"
        />
      </div>

      {editingPlan && (
        <Modal
          title={`Editar Plan: ${editingPlan.title}`}
          open={isModalOpen}
          onCancel={closeModal}
          footer={null}
        >
          <Form
            layout="vertical"
            initialValues={editingPlan}
            onFinish={saveChanges}
          >
            <Form.Item
              label="Título"
              name="title"
              rules={[{ required: true, message: "Por favor ingrese un título" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Subtítulo"
              name="subtitle"
              rules={[{ required: true, message: "Por favor ingrese un subtítulo" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Precio"
              name="price"
              rules={[{ required: true, message: "Por favor ingrese un precio" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Período"
              name="period"
              rules={[{ required: true, message: "Por favor ingrese un período" }]}
            >
              <Input />
            </Form.Item>

            <div className="flex justify-end">
              <Button onClick={closeModal} className="mr-2">
                Cancelar
              </Button>
              <Button type="primary" htmlType="submit">
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default PlansMaintainer;
