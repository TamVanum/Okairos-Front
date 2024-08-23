import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const MqttMessageDisplay = () => {
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        // Escuchar el evento mqttMessage
        socket.on('mqttMessage', (data) => {
            console.log('Received MQTT message:', data);
            setLastMessage(data.message); // Actualiza el estado con el último mensaje recibido
        });

        return () => {
            socket.off('mqttMessage');
        };
    }, []);

    return (
        <div>
            <h1>Último mensaje MQTT:</h1>
            <p>{lastMessage ? JSON.stringify(lastMessage) : 'No se ha recibido ningún mensaje'}</p>
        </div>
    );
};

export default MqttMessageDisplay;