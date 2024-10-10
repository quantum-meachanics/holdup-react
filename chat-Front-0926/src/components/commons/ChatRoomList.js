import React, { useState, useEffect } from 'react';
import { fetchChatRooms, createChatRoom } from '../../apis/chatApi';

const ChatRoomList = ({ onSelectRoom }) => {
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState('');

    useEffect(() => {
        fetchChatRooms().then(setRooms);
    }, []);

    const handleCreateRoom = () => {
        if (roomName.trim()) {
            createChatRoom(roomName).then(newRoom => {
                setRooms([...rooms, newRoom]);
                setRoomName('');
            });
        }
    };

    return (
        <div className="chat-room-list">
            <ul>
                {rooms.map(room => (
                    <li key={room.id} onClick={() => onSelectRoom(room.id)}>
                        {room.name}
                    </li>
                ))}
            </ul>
            <input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
            />
            <button onClick={handleCreateRoom}>Create Room</button>
        </div>
    );
};

export default ChatRoomList;