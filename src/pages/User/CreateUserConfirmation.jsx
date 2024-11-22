import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, message, Spin } from "antd";
import axiosInstance from "../../api/AxiosInstance";
import Swal from "sweetalert2";

const CreateUserConfirmation = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const { userIntentId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (!userIntentId) {
                message.error("Falta el ID de intención de usuario");
                return;
            }

            setLoading(true);
            try {
                const response = await axiosInstance.get(`/usersIntents/formatted/${userIntentId}`);
                setUserData(response.data);
                console.log(response.data);
            } catch (error) {
                message.error("No se pudo obtener la información de la intención de usuario");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userIntentId]);

    const onFinish = async (values) => {
        if (!userData) {
            message.error("No hay datos de usuario disponibles para enviar");
            return;
        }

        const postData = {
            ...userData,
            password: values.password,
        };

        setLoading(true);
        try {
            await axiosInstance.post(`/users/customer`, postData);
            Swal.fire({
                title: "¡Éxito!",
                text: "Tu cuenta ha sido creada exitosamente.",
                icon: "success",
                confirmButtonText: "OK",
                timer: 2000, // Cierra automáticamente después de 2 segundos
                willClose: () => navigate("/login"), // Redirige a /login después de cerrar
            });
        } catch (error) {
            message.error("No se pudo crear el usuario");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            <h1 className="text-2xl font-bold mb-6">Crear Usuario</h1>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="bg-white p-6 rounded shadow-lg w-full max-w-md"
            >
                <Form.Item
                    label="Contraseña"
                    name="password"
                    rules={[
                        { required: true, message: "Por favor, introduce tu contraseña" },
                        { min: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                    ]}
                >
                    <Input.Password
                        placeholder="Introduce tu contraseña"
                        autoComplete="new-password"
                    />
                </Form.Item>

                <Form.Item
                    label="Confirmar Contraseña"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "Por favor, confirma tu contraseña" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Las contraseñas no coinciden"));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Confirma tu contraseña"
                        autoComplete="new-password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Crear Usuario
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateUserConfirmation;
