import React, { useState } from 'react';
import { request } from '../../apis/Api'; // API 요청을 위한 유틸리티
import '../../css/FindEmailForm.css'; // CSS 스타일 추가 (필요한 경우)

const FindEmailForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [foundEmail, setFoundEmail] = useState(''); // 이메일 상태 추가

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await request('POST', '/find-email', { name, phone });
    
            // 문자열 응답을 처리
            if (response) {
                setMessage(response); // 전체 메시지 설정
                setFoundEmail(response.includes("성공적으로 찾았습니다") ? response.split(": ")[1] : ''); // 이메일만 추출
            } else {
                setMessage('이메일을 찾을 수 없습니다.');
                setFoundEmail('');
            }
        } catch (error) {
            console.error('이메일 찾기 오류:', error);
            setMessage('이메일을 찾는 데 실패했습니다.');
            setFoundEmail('');
        }
    };
    

    return (
        <div className="find-email-container">
            <h2>이메일 찾기</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="phone">전화번호</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button className="button" type="submit">이메일 찾기</button>
            </form>
            {message && <div className="message">{message}</div>}
            {foundEmail && (
                <div className="found-email">

                </div>
            )}
        </div>
    );
};

export default FindEmailForm;
