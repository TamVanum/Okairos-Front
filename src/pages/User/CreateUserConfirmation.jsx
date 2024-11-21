import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, message, Spin } from "antd";
import axiosInstance from "../../api/AxiosInstance";

const CreateUserConfirmation = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const { userIntentId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            if (!userIntentId) {
                message.error("User Intent ID is missing");
                return;
            }

            setLoading(true);
            try {
                const response = await axiosInstance.get(`/usersIntents/formatted/${userIntentId}`);
                setUserData(response.data);
                console.log(response.data);
            } catch (error) {
                message.error("Failed to fetch user intent data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userIntentId]);

    const onFinish = async (values) => {
        if (!userData) {
            message.error("No user data available for submission");
            return;
        }

        const postData = {
            ...userData,
            password: values.password,
        };

        setLoading(true);
        try {
            await axiosInstance.post(`/users/customer`, postData);
            message.success("User created successfully!");
        } catch (error) {
            message.error("Failed to create user");
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
            <h1 className="text-2xl font-bold mb-6">Create User</h1>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                className="bg-white p-6 rounded shadow-lg w-full max-w-md"
            >
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Please enter your password" },
                        { min: 6, message: "Password must be at least 6 characters" },
                    ]}
                >
                    <Input.Password
                        placeholder="Enter your password"
                        autoComplete="new-password"
                    />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "Please confirm your password" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Passwords do not match"));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        Create User
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateUserConfirmation;
