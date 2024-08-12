import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Button, notification } from 'antd';
import UserProfile from '../../components/UserProfileForm/UserProfile';
import { useUser } from '../../hooks/useUser';

const UserProfileSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio'),
  lastName: Yup.string().required('El apellido es obligatorio'),
  email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
});



const UserProfileForm = () => {
  const user = useUser();

  const handleAvatarChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevUser) => ({ ...prevUser, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Aquí puedes manejar el envío del formulario
    console.log('Formulario enviado:', values);
    notification.success({
      message: 'Perfil Actualizado',
      description: 'Los datos del perfil han sido actualizados exitosamente.',
    });
    setSubmitting(false);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center justify-center p-4 border-2 w-full md:w-1/3">
        
        <div className='flex flex-row w-full justify-between gap-4'>
          <Button type="primary" danger className="mb-4">
            Actualizar Plan
          </Button>
          <Button type="default" className="mb-4">
            Actualizar Contraseña
          </Button>
        </div>
        <UserProfile user={user} onEditAvatar={handleAvatarChange} />
        <Formik
          initialValues={{ name: user.name, lastname: user.lastname, email: user.email }}
          validationSchema={UserProfileSchema}
          onSubmit={handleSubmit}
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
                <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
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
    </div>
  );
};

export default UserProfileForm;