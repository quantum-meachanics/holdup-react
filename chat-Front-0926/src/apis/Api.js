import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/chat";

export const createChatRoom = async (name) => {
    return axios.post(`${API_BASE_URL}/rooms`, name);
};

export const getChatRooms = async () => {
    return axios.get(`${API_BASE_URL}/rooms`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your_token_here'  // 예시로 인증 토큰을 추가
        }
    });
};

export const getMessages = async (roomId) => {
    return axios.get(`${API_BASE_URL}/rooms/${roomId}/messages`);
};
