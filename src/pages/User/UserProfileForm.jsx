import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Button, notification, Card, Tag, Select, Menu, Dropdown } from 'antd';
import UserProfile from '../../components/UserProfileForm/UserProfile';
import { useUser } from '../../hooks/useUser';
import axiosInstance from '../../api/AxiosInstance';
import { SettingOutlined } from '@ant-design/icons';

const UserProfileSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio'),
  lastname: Yup.string().required('El apellido es obligatorio'),
  email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
});

const UserProfileForm = () => {
  const { userData, updateUserData } = useUser();
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserData({ ...userData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const profileUpdateResponse = await axiosInstance.patch('/users/me', values);
      const profileData = profileUpdateResponse.data;

      let avatarUpdateResponse;
      if (avatar !== null) {
        const avatarFormData = new FormData();
        avatarFormData.append('file', avatar);

        avatarUpdateResponse = await axiosInstance.patch('/users/me/avatar', avatarFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const avatarData = avatarUpdateResponse.data;
        updateUserData({ ...profileData, avatar: avatarData.user.avatar });
      } else {
        updateUserData(profileData);
      }

      notification.success({
        message: 'Perfil Actualizado',
        description: 'Los datos del perfil han sido actualizados exitosamente.',
      });

    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      notification.error({
        message: 'Error al actualizar el perfil',
        description: 'Ha ocurrido un error al intentar actualizar los datos del perfil.',
      });
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row justify-center mx-6 my-10 lg:mx-20 lg:my-20 gap-6 lg:gap-10">

      {/* Columna izquierda - Formulario de perfil */}
      <div className="flex flex-col items-center justify-center p-6 border-2 border-error-200 rounded-xl w-full lg:w-1/2 xl:w-1/3">

        <UserProfile user={userData} onEditAvatar={handleAvatarChange} />
        <Formik
          initialValues={{ name: userData.name, lastname: userData.lastname, email: userData.email }}
          validationSchema={UserProfileSchema}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, { setSubmitting })}
        >
          {({ isSubmitting }) => (
            <Form className="w-full space-y-4 mt-4">
              <div>
                <Field
                  name="name"
                  as={Input}
                  placeholder="Nombre"
                  className="w-full"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Field
                  name="lastname"
                  as={Input}
                  placeholder="Apellido"
                  className="w-full"
                />
                <ErrorMessage name="lastname" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div>
                <Field
                  name="email"
                  as={Input}
                  placeholder="Correo electrónico"
                  type="email"
                  className="w-full"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <Button type="primary" htmlType="submit" className="w-full" disabled={isSubmitting}>
                Actualizar Perfil
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      {/* Columna derecha - Tarjetas adicionales */}
      <div className="flex flex-col gap-6 w-full lg:w-1/2 xl:w-1/3">
        <Card title="Estado de Cuenta" bordered={false}>
          <p>Plan actual: <Tag color="magenta">Plan</Tag></p>
          <p>Costo mensual: $50.000</p>
        </Card>
        <Card title="Hydroponicos Vinculados" bordered={false}>
          <p>Vinculados: 2</p>
          <p>Restantes: 8</p>
        </Card>
        <Card title="Metricas" bordered={false}>
          <p>Metricas creadas: 4</p>
        </Card>
      </div>
    </div>
  );
};

export default UserProfileForm;
