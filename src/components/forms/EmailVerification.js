import React, { useState } from 'react';
import { request } from '../../apis/Api'; // API 요청을 위한 유틸리티
// import '../../css/EmailVerification.css'; // CSS 스타일 추가 (필요한 경우)

const EmailVerification = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);

    const handleSendCode = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', '/send-verification-code', { email });
            setMessage(response); // 성공 메시지 설정
            setIsCodeSent(true);
        } catch (error) {
            setMessage(error.response?.data?.message || "알 수 없는 오류가 발생했습니다.");
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', '/verify-code', { email, verificationCode, newPassword });
            setMessage(response); // 성공 메시지 설정
        } catch (error) {
            setMessage(error.response?.data?.message || "알 수 없는 오류가 발생했습니다.");
        }
    };

    return (
        <div className="email-verification-container">
            <h2>이메일 인증</h2>
            <form onSubmit={handleSendCode}>
                <div className="input-group">
                    <label>이메일 주소</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">인증 코드 전송</button>
            </form>
            {isCodeSent && (
                <form onSubmit={handleVerifyCode}>
                    <div className="input-group">
                        <label>인증 코드</label>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>새 비밀번호</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">코드 확인 및 비밀번호 변경</button>
                </form>
            )}
            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default EmailVerification;
