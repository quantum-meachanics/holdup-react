import React, { useState } from 'react';
import style from '../../css/EmailDomainSelector.module.css';

const EmailDomainSelector = ({
    selectedDomain,
    onDomainChange,
    onEmailChange,
    handleEmailCheck,
    emailAvailable,
    handleSendCode,
    handleVerifyCode,
    verificationCode,
    setVerificationCode
}) => {
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleSendCodeClick = async (e) => {
        e.preventDefault();
        setIsButtonDisabled(true);

        try {
            await handleSendCode();
            setIsCodeSent(true);
        } catch (error) {
            console.error("코드 전송 오류:", error);
            alert("코드 전송에 실패했습니다.");
        } finally {
            setIsButtonDisabled(false);
        }
    };

    return (
        <div className={style.body}>
            <input
                className={style.input}
                type="text"
                placeholder="이메일"
                onChange={onEmailChange}
                required
            />

            <select className={style.input} value={selectedDomain} onChange={onDomainChange}>
                <option value=""></option>
                <option value="@gmail.com">@gmail.com</option>
                <option value="@naver.com">@naver.com</option>
                <option value="@daum.net">@daum.net</option>
            </select>
            <button className={style.button} type="button" onClick={handleEmailCheck}>이메일 중복 확인</button>
            <br />
            {emailAvailable !== null && (
                <span>
                    {emailAvailable ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.'}
                </span>
            )}
            <br />
            {/* 인증 코드 전송 */}
            <button
                type="button"
                onClick={handleSendCodeClick}
                disabled={isButtonDisabled}
                className={style.button}
            >
                인증 코드 전송
            </button>
            <br />

            {isCodeSent && (
                <>
                    <label>인증 코드</label>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)} // 외부에서 받은 setVerificationCode 사용
                    />
                    <button
                        type="button"
                        className={style.button}
                        onClick={(e) => {
                            e.preventDefault(); // preventDefault를 여기서 호출
                            handleVerifyCode(verificationCode); // 인증 코드와 함께 함수 호출
                        }}
                    >
                        인증 코드 확인
                    </button>
                </>
            )}
        </div>
    );
};

export default EmailDomainSelector;
