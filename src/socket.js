import { io } from 'socket.io-client';

const SOCKET_URL = 'https://18.217.150.211:8443';

const socket = io(SOCKET_URL, {
    transports: ['websocket'],
});

export default socket;
