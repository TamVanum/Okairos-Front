import React from 'react';
import { Card, Input, Button, Typography } from 'antd';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/temporalLogo.svg';
import useAuthStore from '../../contexts/AuthContext';
import axios from 'axios';
import axiosInstance from '../../api/AxiosInstance';

const { Title } = Typography;

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email es requerido'),
    password: Yup.string().required('Contraseña es requerida'),
});

function Login() {
    const navigate = useNavigate();
    const setToken = useAuthStore(state => state.setToken);
    const setUser = useAuthStore(state => state.setUser);
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setSubmitting(true);

            const userCredential = await AuthService.signIn(values.email, values.password);
            const user = userCredential.user;
            const token = {
                access: await user.getIdToken(),
                uid: user.uid
            };

            console.log('Token:', token);

            setToken(token);

            const response = await axiosInstance.get('/users/me');

            setUser(response.data);

            if (response.data.isAdmin === true) {
                navigate('/admin');
            } else {
                navigate('/customer');
            }
            
        } catch (error) {
            console.error('Error durante el proceso de autenticación:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex h-screen flex-col lg:flex-row">
            <div className="lg:w-1/4 bg-green-600 flex items-center justify-center p-8">
                <Title className="text-white" level={2}>Bienvenido</Title>
            </div>
            <div className="lg:w-3/4 flex items-center justify-center p-8 content-center">
                <Card className="w-full max-w-md shadow-lg ">
                    {/* <img src={logo} className='size-48 justify-center' alt="" /> */}
                    <Title level={2} className="text-center">Iniciar sesión</Title>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {formik => (
                            <FormikForm className="space-y-4">
                                <div>
                                    <label htmlFor="email">Email:</label>
                                    <Field
                                        name="email"
                                        as={Input}
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="password">Contraseña:</label>
                                    <Field
                                        name="password"
                                        as={Input.Password}
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <Button type="primary" htmlType="submit" className="w-full" disabled={formik.isSubmitting}>
                                    Iniciar sesión
                                </Button>
                            </FormikForm>
                        )}
                    </Formik>
                </Card>
            </div>
        </div>
    );
}

export default Login;