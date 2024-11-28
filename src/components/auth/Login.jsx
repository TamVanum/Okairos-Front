import React from 'react';
import { Card, Input, Button, Typography, Image } from 'antd';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import logo_text from '../../assets/text_logo.svg';
import useAuthStore from '../../contexts/AuthContext';
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
            <div className="lg:w-1/2 bg-bgContainer-300 flex flex-row items-center justify-center p-8">
                <img src={logo} className="w-full" alt="logo" />
            </div>
            <div className="lg:w-1/2 flex items-center justify-center p-8 content-center bg-bgContainer-300">
                <div className="w-full max-w-md bg-bgContainer-100 shadow-lg rounded-lg p-8">
                    <div className="text-center mb-5">
                        <img src={logo_text} className="w-40 mx-auto mb-3" alt="logo text" />
                    </div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                    >
                        {formik => (
                            <FormikForm className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block font-medium font-sans text-primary-500">Email:</label>
                                    <Field
                                        name="email"
                                        as={Input}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block font-medium font-sans text-primary-500">Contraseña:</label>
                                    <Field
                                        name="password"
                                        as={Input.Password}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-md disabled:opacity-50"
                                    disabled={formik.isSubmitting}
                                >
                                    Iniciar sesión
                                </Button>
                                <button
                                    type="button"
                                    className="w-full text-primary-500 text-sm mt-2 hover:underline"
                                    onClick={() => navigate('/forgot-password')}
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </FormikForm>
                        )}
                    </Formik>
                </div>

            </div>
            <div className="lg:w-1/2 bg-bgContainer-300 flex flex-row items-center justify-center p-8">
                <img src={logo} className="w-full" alt="logo" />
            </div>
        </div>
    );
}

export default Login;