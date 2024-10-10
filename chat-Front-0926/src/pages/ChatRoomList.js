import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { getChatRooms, createChatRoom } from '../apis/Api';

const ChatRoomList = () => {
    const { rooms, setRooms } = useChat();  // 전역 상태에서 rooms를 가져옴
    const [newRoomName, setNewRoomName] = useState('');
    const navigate = useNavigate();

    // 채팅방 목록 가져오기
    useEffect(() => {
        getChatRooms().then(response => setRooms(response.data));
    }, [setRooms]);

    // 채팅방 생성
    const handleCreateRoom = () => {
        createChatRoom(newRoomName).then(() => {
            setNewRoomName('');
            getChatRooms().then(response => setRooms(response.data));
        });
    };

    // 채팅방 클릭 시 해당 방으로 이동
    const handleRoomClick = (roomId) => {
        navigate(`/chat/${roomId}`);
    };

    return (
        <div>
            <h2>채팅방 목록</h2>
            <ul>
                {rooms.map(room => (
                    <li key={room.id} onClick={() => handleRoomClick(room.id)}>
                        {room.name}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="새 채팅방 이름"
            />
            <button onClick={handleCreateRoom}>채팅방 생성</button>
        </div>
    );
};

export default ChatRoomList;
