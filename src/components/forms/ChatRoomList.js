import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getChatRooms, createChatRoom } from '../../apis/Api';

const ChatRoomList = () => {
const [chatRooms, setChatRooms] = useState([]);
const [newRoomName, setNewRoomName] = useState('');
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
    fetchChatRooms();
}, []);

const fetchChatRooms = async () => {
    try {
    const rooms = await getChatRooms();
    setChatRooms(rooms);
    } catch (error) {
    console.error('Failed to fetch chat rooms:', error);
    }
};

const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (newRoomName.trim()) {
    try {
        await createChatRoom({ name: newRoomName });
        setNewRoomName('');
        fetchChatRooms(); // 목록 새로고침
    } catch (error) {
        console.error('Failed to create chat room:', error);
    }
    }
};

const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
    <div className="chat-room-list">
    <h1>채팅방</h1>

    <form onSubmit={handleCreateRoom}>
        <input
        type="text"
        value={newRoomName}
        onChange={(e) => setNewRoomName(e.target.value)}
        placeholder="New room name"
        />
        <button type="submit">Create Room</button>
    </form>

    <ul>
        {filteredRooms.map(room => (
        <li key={room.id}>
            <Link to={`/chat/${room.id}`}>{room.name}</Link>
        </li>
        ))}
    </ul>
    </div>
);
};

export default ChatRoomList;
