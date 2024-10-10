import React, { useState } from 'react';
import { handleVerifyCode } from '../../apis/SignupFormAPICall'; 
import style from '../../css/EmailDomainSelector.module.css';

const EmailDomainSelector = ({
    selectedDomain,
    onDomainChange,
    onEmailChange,
    handleEmailCheck,
    emailAvailable,
    handleSendCode,
    verificationCode,
    setVerificationCode,
    setMessage,
    formData,
    setIsEmailEditable
}) => {
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [verificationMessage, setVerificationMessage] = useState(''); // 인증 결과 메시지 관리
    const [isVerified, setIsVerified] = useState(false); // 인증 여부 상태 추가

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
            const response = await handleVerifyCode(formData, selectedDomain, verificationCode, setMessage, setIsEmailEditable);
            
            // 응답 확인
            console.log("처리된 응답:", response);
            
            // 응답이 undefined인지 확인
            if (!response) {
                console.log("응답이 undefined입니다.");
                return;
            }
    
            // API 응답에서 success가 true인 경우
            if (response.success) {
                setVerificationMessage(response.message);
                setIsVerified(true); // 인증 성공 시 상태 업데이트
            } else {
                setVerificationMessage(response.message || '인증에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error("인증 코드 확인 오류:", error);
            setVerificationMessage('인증 과정에서 오류가 발생했습니다.');
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
                disabled={isVerified} // 인증이 완료된 경우 비활성화
            />

            <select 
                className={style.input} 
                value={selectedDomain} 
                onChange={onDomainChange}
                disabled={isVerified} // 인증이 완료된 경우 비활성화
            >
                <option value="@gmail.com">@gmail.com</option>
                <option value="@naver.com">@naver.com</option>
                <option value="@daum.net">@daum.net</option>
            </select>
            <button className={style.button} type="button" onClick={handleEmailCheck} disabled={isVerified}>
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
                disabled={isButtonDisabled || isVerified} // 인증이 완료된 경우 비활성화
                className={style.button}
            >
                인증 코드 전송
            </button>
            <br />

            {isCodeSent && !isVerified && ( // 인증 완료되지 않은 경우에만 보여줌
                <>
                    <label>인증 코드</label>
                    <input
                        type="text"
                        value={verificationCode}
                        className={style.input}
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
