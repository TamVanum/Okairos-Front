import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Button, notification } from 'antd';
import UserProfile from '../../components/UserProfileForm/UserProfile';
import { useUser } from '../../hooks/useUser';
import axiosInstance from '../../api/AxiosInstance';

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

      // Mostrar notificación de éxito
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
    <div className="flex justify-center mx-20 my-20 gap-10">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-error-200 rounded-xl w-full md:w-2/3 lg:w-1/3">

        <div className='flex flex-col lg:flex-row w-full justify-between gap-4'>
          <Button type="primary" danger className="mb-4">
            Actualizar Plan
          </Button>
          <Button type="default" className="mb-4">
            Actualizar Contraseña
          </Button>
        </div>
        <UserProfile user={userData} onEditAvatar={handleAvatarChange} />
        <Formik
          initialValues={{ name: userData.name, lastname: userData.lastname, email: userData.email }}
          validationSchema={UserProfileSchema}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, { setSubmitting })}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-sm space-y-4 mt-4">
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
      <div className='flex flex-col lg:flex-row justify-between gap-4'>
        <Button type="primary" danger className="mb-4">
          Actualizar Plan
        </Button>
        <Button type="default" className="mb-4">
          Actualizar Contraseña
        </Button>
      </div>
    </div>
  );
};

export default UserProfileForm;