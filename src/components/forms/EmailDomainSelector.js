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
    const [isEmailEditable, setIsEmailEditable] = useState(true); // 이메일 입력 가능 여부 관리
    const [verificationMessage, setVerificationMessage] = useState(''); // 인증 결과 메시지 관리

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

    const handleVerifyCodeClick = async (e) => {
        e.preventDefault();
        try {
            const success = await handleVerifyCode(verificationCode); // 성공 여부를 받아옴
            if (success) {
                setVerificationMessage('인증에 성공했습니다.');
                setIsEmailEditable(false); // 인증 성공 시 이메일 입력 불가
            } else {
                setVerificationMessage('인증에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error("인증 코드 확인 오류:", error);
            setVerificationMessage('인증 과정에서 오류가 발생했습니다.');
        }
    };

    return (
        <div className={style.body}>
            {/* 이메일 입력 필드 비활성화 처리 */}
            <input
                className={style.input}
                type="text"
                placeholder="이메일"
                onChange={onEmailChange}
                disabled={!isEmailEditable} // 인증 성공 시 수정 불가
                required
            />

            <select className={style.input} value={selectedDomain} onChange={onDomainChange} disabled={!isEmailEditable}>
                <option value="@gmail.com">@gmail.com</option>
                <option value="@naver.com">@naver.com</option>
                <option value="@daum.net">@daum.net</option>
            </select>
            <button className={style.button} type="button" onClick={handleEmailCheck} disabled={!isEmailEditable}>
                이메일 중복 확인
            </button>
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
                disabled={isButtonDisabled || !isEmailEditable}
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
                        onClick={handleVerifyCodeClick} // 인증 코드 확인 처리
                    >
                        인증 코드 확인
                    </button>
                </>
            )}

            {/* 인증 성공 또는 실패 메시지 출력 */}
            {verificationMessage && <p>{verificationMessage}</p>}
        </div>
    );
};

export default EmailDomainSelector;
