import React, { useState, useEffect } from 'react';
import { request } from '../../apis/Api'; // API 요청을 위한 유틸리티
import styles from '../../css/EmailVerification.module.css'; 

const EmailVerification = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [timer, setTimer] = useState(300); // 5분 타이머 (300초)
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태

    const enableButton = () => {
        setIsButtonDisabled(false);
        setTimer(300); // 타이머 초기화
    };

    useEffect(() => {
        let interval = null;
        if (isButtonDisabled && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000); // 1초마다 타이머 감소
        } else if (timer === 0) {
            enableButton();
        }
        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
    }, [isButtonDisabled, timer]);

    const handleSendCode = async (e) => {
        e.preventDefault();
        if (isButtonDisabled) {
            setMessage("5분 후에 다시 시도할 수 있습니다.");
            return;
        }

        try {
            const response = await request('POST', '/send-verification-code', { email });
            setMessage(response); // 성공 메시지 설정
            setIsCodeSent(true);
            setIsButtonDisabled(true);

            // 5분 타이머 시작
            setTimer(300);
        } catch (error) {
            setMessage(error.response?.data?.message || "알 수 없는 오류가 발생했습니다.");
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await request('POST', '/verify-code', { email, verificationCode, newPassword });
            setMessage(response); // 성공 메시지 설정
        } catch (error) {
            setMessage(error.response?.data?.message || "알 수 없는 오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.emailVerificationContainer}>
            <h2>이메일 인증</h2>
            <form onSubmit={handleSendCode}>
                <div className={styles.inputGroup}>
                    <label>이메일 주소</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.button} disabled={isButtonDisabled}>
                    인증 코드 전송
                </button>
                {isButtonDisabled && (
                    <div className={styles.timer}>
                        남은 시간: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    </div>
                )}
            </form>
            {isCodeSent && (
                <form onSubmit={handleVerifyCode}>
                    <div className={styles.inputGroup}>
                        <label>인증 코드</label>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>새 비밀번호</label>
                        <div className={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"} // 비밀번호 표시 여부에 따라 type 변경
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                {showPassword ? "숨기기" : "보기"}
                            </span>
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>비밀번호 확인</label>
                        <div className={styles.passwordContainer}>
                            <input
                                type={showPassword ? "text" : "password"} // 비밀번호 표시 여부에 따라 type 변경
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                {showPassword ? "숨기기" : "보기"}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className={styles.button}>
                        코드 확인 및 비밀번호 변경
                    </button>
                </form>
            )}
            {message && <div className={styles.message}>{message}</div>}
        </div>
    );
};

export default EmailVerification;
