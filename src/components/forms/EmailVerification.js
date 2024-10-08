import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendVerificationCode, verifyCodeAndChangePassword } from '../../apis/EmailVerificationAPICall';
import styles from '../../css/EmailVerification.module.css';

const EmailVerification = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [timer, setTimer] = useState(300); // 5분 타이머 (300초)
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 표시 상태
    const [passwordStrength, setPasswordStrength] = useState(''); // 비밀번호 강도 상태
    const [isSuccess, setIsSuccess] = useState(false); // 성공 여부 상태

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
            setMessage('인증 코드 전송 버튼을 다시 활성화합니다.');
        }
        return () => clearInterval(interval);
    }, [isButtonDisabled, timer]);

    const handleSendCode = async (e) => {
        e.preventDefault();
        if (isButtonDisabled) {
            setMessage("5분 후에 다시 시도할 수 있습니다.");
            return;
        }

        const result = await sendVerificationCode(email);
        setMessage(result.message);
        if (result.success) {
            setIsCodeSent(true);
            setIsButtonDisabled(true);
            setTimer(300); // 5분 타이머 시작
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        const result = await verifyCodeAndChangePassword(email, verificationCode, newPassword);
        setMessage(result.message);
        if (result.success) {
            setIsSuccess(true); // 인증 성공 시 상태 변경
        }
    };

    // 비밀번호 강도 확인 함수
    const getPasswordStrength = (password) => {
        if (password.length < 6) return '너무 짧습니다.';
        if (!/[A-Z]/.test(password)) return '대문자를 포함해야 합니다.';
        if (!/[a-z]/.test(password)) return '소문자를 포함해야 합니다.';
        if (!/[0-9]/.test(password)) return '숫자를 포함해야 합니다.';
        if (!/[!@#$%^&*]/.test(password)) return '특수 문자를 포함해야 합니다.';
        return '강함';
    };

    const handleNewPasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
        setPasswordStrength(getPasswordStrength(password)); // 비밀번호 강도 설정
    };

    return (
        <div className={styles.emailVerificationContainer}>
            <h2>이메일 인증</h2>
            {isSuccess ? (
                <div>
                    <p>비밀번호가 성공적으로 변경되었습니다.</p>
                    <button className={styles.button} onClick={() => navigate('/holdup/login')}>
                        로그인
                    </button>
                    <button className={styles.button} onClick={() => navigate('/holdup/find-email')}>
                        아이디 찾기
                    </button>
                </div>
            ) : (
                <>
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
                                        onChange={handleNewPasswordChange}
                                        required
                                    />
                                    <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', marginLeft: '10px' }}>
                                        {showPassword ? "숨기기" : "보기"}
                                    </span>
                                </div>
                                {passwordStrength && (
                                    <div className={styles.passwordStrength}>{passwordStrength}</div>
                                )}
                            </div>
                            <div className={styles.inputGroup}>
                                <label>비밀번호 확인</label>
                                <div className={styles.passwordContainer}>
                                    <input
                                        type={showPassword ? "text" : "password"}
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
                </>
            )}
            {message && <div className={styles.message}>{message}</div>}
        </div>
    );
};

export default EmailVerification;
