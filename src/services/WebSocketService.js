import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

class WebSocketService {
    constructor() {
        this.stompClient = null;
    }

    connect(callback) {
        const socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);
        this.stompClient.debug = (str) => {
            console.log('WebSocket Debug:', str);
        };
        this.stompClient.connect({}, (frame) => {
            console.log('Connected to WebSocket:', frame);
            if (callback) callback();
        }, (error) => {
            console.error('WebSocket connection error:', error);
        });
    }

    disconnect() {
        if (this.stompClient) {
            this.stompClient.disconnect();
        }
    }

    subscribe(topic, callback) {
        console.log('Subscribing to topic:', topic);
        this.stompClient.subscribe(topic, (message) => {
            console.log('Received message on topic:', topic, message.body);
            callback(JSON.parse(message.body));
        });
    }

    sendMessage(destination, message) {
        this.stompClient.send(destination, {}, JSON.stringify(message));
    }
}

export default new WebSocketService();