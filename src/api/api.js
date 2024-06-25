import axios from 'axios';

// Base URL for the backend API
const API_URL = 'http://localhost:8080';

// Function to get the JWT token from localStorage
const getToken = () => {
    return localStorage.getItem('token');
};

// Function to set the JWT token in localStorage
const setToken = (token) => {
    localStorage.setItem('token', token);
};

// API service
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add the JWT token to each request
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Authentication API calls
export const authApi = {
    signUp: (data) => api.post('/auth/signup', data),
    signIn: (data) => api.post('/auth/signin', data),
};

// User API calls
export const userApi = {
    getProfile: () => api.get('/api/users/profile'),
    updateProfile: (data) => api.put('/api/users/update', data),
};

// Chat API calls
export const chatApi = {
    getChats: () => api.get('/api/chats/user'),
    createSingleChat: (data) => api.post('/api/chats/single', data),
    createGroupChat: (data) => api.post('/api/chats/group', data),
};

// Message API calls
export const messageApi = {
    getMessages: (chatId) => api.get(`/api/messages/${chatId}`),
    sendMessage: (data) => api.post('/api/messages/create', data),
};

export default api;
