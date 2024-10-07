import React, { createContext, useState, useContext } from 'react';

// Context 생성
const ChatContext = createContext();

// Context Provider 컴포넌트
export const ChatProvider = ({ children }) => {
    const [rooms, setRooms] = useState([]);  // 채팅방 목록 관리
    const [currentRoom, setCurrentRoom] = useState(null);  // 현재 선택된 채팅방

    return (
        <ChatContext.Provider value={{ rooms, setRooms, currentRoom, setCurrentRoom }}>
            {children}
        </ChatContext.Provider>
    );
};

// Context 값을 쉽게 사용하기 위한 커스텀 훅
export const useChat = () => {
    return useContext(ChatContext);
};
