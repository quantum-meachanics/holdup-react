import React, { useState } from 'react';
import { createChatRoom } from '../../apis/Api';  // 경로를 수정했습니다

const ChatRoomForm = ({ onRoomCreated }) => {
const [roomName, setRoomName] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    if (roomName.trim()) {
    try {
        const newRoom = await createChatRoom({ name: roomName });
        setRoomName('');
        if (onRoomCreated) {
        onRoomCreated(newRoom);
        }
    } catch (error) {
        console.error('Failed to create chat room:', error);
    }
    }
};

return (
    <form onSubmit={handleSubmit}>
    <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="New room name"
        required
    />
    <button type="submit">Create Room</button>
    </form>
);
};

export default ChatRoomForm;