import React from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.on('connect', () => {
    console.log('connected to WebSocket server');
});

socket.on('message', (msg) => {
    console.log('received: ' + msg);
});

socket.on('disconnect', () => {
    console.log('disconnected from WebSocket server');
});

// Para enviar un mensaje
socket.emit('message', 'Hello World');

const WebSocketsTestPage = () => {
    return (
        <>
            <div>
                <h1>WebSocketsTestPage</h1>
            </div>
        </>
    );
}

export default WebSocketsTestPage;