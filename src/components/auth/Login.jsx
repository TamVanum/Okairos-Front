import React, { useState } from 'react';
import AuthService from '../../services/AuthService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        AuthService.signIn(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('Usuario logueado:', user);
            }
            ).catch((error) => {
                console.error('Error al iniciar sesión:', error);
            });
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
            <div className="grid grid-cols-10 gap-2">
                <div className="bg-sky-50 aspect-square"></div>
                <div className="bg-sky-100 aspect-square"></div>
                <div className="bg-sky-200 aspect-square"></div>
                <div className="bg-sky-300 aspect-square"></div>
                <div className="bg-sky-400 aspect-square"></div>
                <div className="bg-sky-500 aspect-square"></div>
                <div className="bg-sky-600 aspect-square"></div>
                <div className="bg-sky-700 aspect-square"></div>
                <div className="bg-sky-800 aspect-square"></div>
                <div className="bg-sky-900 aspect-square"></div>
            </div>
        </div>


    );
}

export default Login;