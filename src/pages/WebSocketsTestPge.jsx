import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Initialize the socket outside of the component to ensure it doesn't reinitialize on every render
const socket = io('http://localhost:3000', {
    autoConnect: false, // Control when the socket connects
    reconnection: false, // Disable auto-reconnection to prevent multiple connections
});

const WebSocketsTestPage = ({ roomId }) => {
    // State to hold messages received from the WebSocket server
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (roomId) {
            // Manually connect the socket if not already connected
            if (!socket.connected) {
                socket.connect();
            }

            // Join the room
            socket.emit('joinRoom', roomId);

            // Listen for messages from the server
            const handleMessage = (msg) => {
                try {
                    // Try to parse the message as JSON
                    const parsedMessage = JSON.parse(msg);
                    console.log('Received JSON message:', parsedMessage);
                    setMessages(prevMessages => [...prevMessages, parsedMessage]);
                } catch (e) {
                    // If parsing fails, treat it as a string
                    console.log('Received string message:', msg);
                    setMessages(prevMessages => [...prevMessages, msg]);
                }
            };

            socket.on('message', handleMessage);

            return () => {
                socket.off('message', handleMessage);
                socket.emit('leaveRoom', roomId);
                socket.disconnect();
                console.log('Clean up and disconnect');
            };
        }
    }, [roomId]); 

    const sendMessage = () => {
        socket.emit('sendMessageToRoom', { roomId, message: 'Hello from Room' });
    };

    return (
        <div>
            <h1>WebSockets Test Page</h1>
            <h2>Room: {roomId}</h2>
            <button onClick={sendMessage}>Send Message to Room</button>
            <div>
                <h2>Messages Received:</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            {typeof msg === 'object' ? JSON.stringify(msg, null, 2) : msg}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WebSocketsTestPage;
