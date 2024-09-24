import React from 'react';

const SignupFormUI = ({
    formData,
    setFormData,
    nicknameAvailable,
    handleNicknameCheck,
    handleSendCode,
    verificationCode,
    setVerificationCode,
    handleVerifyCode,
    handleSubmit,
    loading,
    message,
    isCodeSent,
    isButtonDisabled,
    isAgreed,
    setIsAgreed,
    setIsPopupOpen,
    handlePhoneChange,
    handleBirthdayChange
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>회원가입</h2>

            <label>이름</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

            <label>비밀번호</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />

            <label>비밀번호 확인</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />

            <label>닉네임</label>
            <input type="text" name="nickname" value={formData.nickname} onChange={handleInputChange} required />
            <button type="button" onClick={handleNicknameCheck}>닉네임 중복 확인</button>
            {nicknameAvailable !== null && (
                <span>
                    {nicknameAvailable ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.'}
                </span>
            )}

            <input
                type="text" name="phone" value={formData.phone} onChange={handlePhoneChange} required />

            <input
                type="text" name="birthday" value={formData.birthday} onChange={handleBirthdayChange} required />

            <label>주소</label>
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} readOnly />
            <button type="button" onClick={() => setIsPopupOpen(true)}>주소 찾기</button>

            <label>주소 상세</label>
            <input type="text" name="addressDetail" value={formData.addressDetail} onChange={handleInputChange} />

            <button type="button" onClick={handleSendCode} disabled={isButtonDisabled}>인증 코드 전송</button>
            {isCodeSent && (
                <>
                    <label>인증 코드</label>
                    <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                    <button type="button" onClick={handleVerifyCode}>코드 확인</button>
                    {message && <p>{message}</p>}
                </>
            )}

            <label>
                <input type="checkbox" checked={isAgreed} onChange={() => setIsAgreed(!isAgreed)} />
                약관에 동의합니다.
            </label>

            <button type="submit" disabled={loading}>회원가입</button>
        </form>
    );
};

export default SignupFormUI;
