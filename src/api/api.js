import axios from 'axios';

export const API_URL = 'http://localhost:8080';

const getToken = () => {
    return localStorage.getItem('token');
};

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export const authApi = {
    signUp: (data) => api.post('/auth/signup', data),
    signIn: (data) => api.post('/auth/signin', data),
};

export const userApi = {
    getProfile: () => api.get('/api/users/profile'),
    updateProfile: (data) => api.put('/api/users/update', data),
    searchUsers: async (query) => {
        try {
            const response = await api.get(`/api/users/${query}`);
            return response.data.map(result => ({
                ...result,
                isGroup: result.hasOwnProperty('chatName') // Assuming 'chatName' is a property only for groups
            }));
        } catch (error) {
            console.error('Error searching users and groups:', error);
            throw error;
        }
    },
    getUserProfile: (userId) => api.get(`/api/users/profile/${userId}`),  // Add endpoint to get specific user profile
    getCommonGroups: (userId) => api.get(`/api/users/common-groups/${userId}`)
};

export const chatApi = {
    getUserChats: () => api.get('/api/chats/user'),
    createChat: (userId) => api.post('/api/chats/single', { userId }),
    createGroupChat: (data) => api.post('/api/chats/group', data),
    getChatById: (chatId) => api.get(`/api/chats/${chatId}`),
};

export const messageApi = {
    getMessages: async (chatId) => {
        try {
            const response = await api.get(`/api/messages/${chatId}`);
            console.log('messageApi.getMessages response:', response.data); // Log the data
            return response;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    },
    sendMessage: async (data) => {
        try {
            const response = await api.post('/api/messages/create', data);
            console.log('messageApi.sendMessage response:', response.data); // Log the data
            return response;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    },
};

export const handleApiError = (error) => {
    if (error.response) {
        console.error("API Error:", error.response.data);
        return error.response.data;
    } else if (error.request) {
        console.error("No response received:", error.request);
        return { message: "No response received from server" };
    } else {
        console.error("Error:", error.message);
        return { message: "An error occurred while processing your request" };
    }
};

export default api;
