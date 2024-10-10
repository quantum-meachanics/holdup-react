import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatRoomList from './pages/ChatRoomList';  // 채팅방 목록 페이지
import ChatRoom from './pages/ChatRoom';  // 채팅방 페이지
import { ChatProvider } from './context/ChatContext';  // 전역 상태 관리를 위한 Context Provider

function App() {
  return (
    // ChatProvider로 감싸서 전역 상태 관리
    <ChatProvider>
      <Router>
        <Routes>
          {/* 채팅방 목록 페이지 경로 */}
          <Route path="/" element={<ChatRoomList />} />
          
          {/* 개별 채팅방 경로 (roomId가 동적 파라미터로 전달됨) */}
          <Route path="/chat/:roomId" element={<ChatRoom />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}

export default App;
