import React, { useState } from 'react';
import { Modal, Form, Input, InputNumber, Checkbox, Button } from 'antd';

const AddMetricModal = ({ onAddMetric }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        form.resetFields();
    };

    const handleFinish = (values) => {
        const newMetric = {
            name: values.name,
            water_flow: values.water_flow,
            attributes: [
                {
                    name: "water_temperature",
                    minimum: values.water_temperature_min,
                    maximum: values.water_temperature_max,
                    unit_of_measurement: "°C"
                },
                {
                    name: "ambient_temperature",
                    minimum: values.ambient_temperature_min,
                    maximum: values.ambient_temperature_max,
                    unit_of_measurement: "°C"
                },
                {
                    name: "ph_level",
                    minimum: values.ph_min,
                    maximum: values.ph_max,
                    unit_of_measurement: "pH"
                },
                {
                    name: "electrical_conductivity",
                    minimum: values.ec_min,
                    maximum: values.ec_max,
                    unit_of_measurement: "µS/cm"
                }
            ]
        };

        onAddMetric(newMetric);
        handleClose();
    };

    return (
        <>
            <Button type="primary" onClick={handleOpen}>
                Agregar métrica
            </Button>
            <Modal
                title="Agregar Nueva Métrica"
                open={open}
                onCancel={handleClose}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        label="Nombre de la métrica"
                        name="name"
                        rules={[{ required: true, message: 'Por favor ingresa el nombre de la métrica' }]}
                    >
                        <Input placeholder="Ej. Tomate" />
                    </Form.Item>

                    <Form.Item
                        label="Flujo de agua"
                        name="water_flow"
                        valuePropName="checked"
                    >
                        <Checkbox>Activado</Checkbox>
                    </Form.Item>

                    <Form.Item label="Temperatura del agua (°C)">
                        <Form.Item
                            name="water_temperature_min"
                            noStyle
                            rules={[{ required: true, message: 'Mínima requerida' }]}
                        >
                            <InputNumber placeholder="Mínima" />
                        </Form.Item>
                        {' '}a{' '}
                        <Form.Item
                            name="water_temperature_max"
                            noStyle
                            rules={[{ required: true, message: 'Máxima requerida' }]}
                        >
                            <InputNumber placeholder="Máxima" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Temperatura ambiental (°C)">
                        <Form.Item
                            name="ambient_temperature_min"
                            noStyle
                            rules={[{ required: true, message: 'Mínima requerida' }]}
                        >
                            <InputNumber placeholder="Mínima" />
                        </Form.Item>
                        {' '}a{' '}
                        <Form.Item
                            name="ambient_temperature_max"
                            noStyle
                            rules={[{ required: true, message: 'Máxima requerida' }]}
                        >
                            <InputNumber placeholder="Máxima" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="pH">
                        <Form.Item
                            name="ph_min"
                            noStyle
                            rules={[{ required: true, message: 'Mínima requerida' }]}
                        >
                            <InputNumber placeholder="Mínima" />
                        </Form.Item>
                        {' '}a{' '}
                        <Form.Item
                            name="ph_max"
                            noStyle
                            rules={[{ required: true, message: 'Máxima requerida' }]}
                        >
                            <InputNumber placeholder="Máxima" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Conductividad eléctrica (µS/cm)">
                        <Form.Item
                            name="ec_min"
                            noStyle
                            rules={[{ required: true, message: 'Mínima requerida' }]}
                        >
                            <InputNumber placeholder="Mínima" />
                        </Form.Item>
                        {' '}a{' '}
                        <Form.Item
                            name="ec_max"
                            noStyle
                            rules={[{ required: true, message: 'Máxima requerida' }]}
                        >
                            <InputNumber placeholder="Máxima" />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Agregar Métrica
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddMetricModal;
