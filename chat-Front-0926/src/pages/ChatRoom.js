import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const ChatRoom = () => {
    
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        // WebSocket 연결 설정
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/public', (message) => {
                const messageBody = JSON.parse(message.body);
                setMessages(prevMessages => [...prevMessages, messageBody]);
            });
        });
        setStompClient(stompClient);

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (stompClient && messageInput.trim() !== '') {
            const chatMessage = {
                sender: 'user',  // 실제 유저 이름을 넣으면 됩니다.
                content: messageInput,
                type: 'CHAT'
            };
            stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
            setMessageInput('');
        }
    };

    return (
        <div>
            <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <b>{msg.sender}:</b> {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatRoom;
