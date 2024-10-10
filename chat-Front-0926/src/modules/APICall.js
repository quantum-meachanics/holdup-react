import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';  // sockjs-client 사용

let stompClient: any = null;  // stompClient 전역 변수 선언

// WebSocket 연결 함수
export const connectWebSocket = (chatRoomId: string, onMessageReceived: (message: any) => void) => {
    // SockJS 팩토리를 Stomp.over에 전달
    const socket = new SockJS('http://localhost:8080/ws');  // WebSocket 서버 주소
    stompClient = Stomp.over(socket);  // SockJS를 사용하는 STOMP 클라이언트 생성

    const onConnectSuccess = (frame: any) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe(`/topic/chatroom/${chatRoomId}`, onMessageReceived);  // 메시지 구독
    };

    const onConnectError = (error: any) => {
        console.error('WebSocket connection error:', error);
        // 재연결 로직 등을 여기에 추가할 수 있음
    };

    // WebSocket 연결 시도
    stompClient.connect({}, onConnectSuccess, onConnectError);
};

// 메시지 전송 함수
export const sendMessage = (chatRoomId: string, message: any) => {
    if (stompClient && stompClient.connected) {
        // 특정 채팅방에 메시지 전송
        stompClient.send(`/app/chat/${chatRoomId}/sendMessage`, {}, JSON.stringify(message));
    } else {
        console.error('STOMP connection is not established.');
    }
};
