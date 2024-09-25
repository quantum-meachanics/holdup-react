import React, { useState } from 'react';

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
    // 비밀번호 표시 상태
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const getPasswordStrength = (password) => {
        if (password.length < 6) return '너무 짧습니다.';
        if (!/[A-Z]/.test(password)) return '대문자를 포함해야 합니다.';
        if (!/[a-z]/.test(password)) return '소문자를 포함해야 합니다.';
        if (!/[0-9]/.test(password)) return '숫자를 포함해야 합니다.';
        if (!/[!@#$%^&*]/.test(password)) return '특수 문자를 포함해야 합니다.';
        return '강함';
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, password: value });
        setPasswordStrength(getPasswordStrength(value));
        setPasswordMatch(value === formData.confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, confirmPassword: value });
        setPasswordMatch(value === formData.password);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>회원가입</h2>

            {/* 이름 입력 */}
            <label>이름</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
            />

            {/* 비밀번호 입력 */}
            <label>비밀번호</label>
            <div>
                <input
                    type={showPassword ? "text" : "password"}  // 비밀번호 표시/숨기기
                    name="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}  // 버튼 클릭 시 상태 변경
                >
                    {showPassword ? '숨기기' : '표시'}
                </button>
            </div>
            {passwordStrength && <p>비밀번호 강도: {passwordStrength}</p>}

            {/* 비밀번호 확인 */}
            <label>비밀번호 확인</label>
            <div>
                <input
                    type={showConfirmPassword ? "text" : "password"}  // 비밀번호 확인 필드도 동일한 방식 적용
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}  // 버튼 클릭 시 상태 변경
                >
                    {showConfirmPassword ? '숨기기' : '표시'}
                </button>
            </div>
            {!passwordMatch && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}

            {/* 닉네임 입력 및 중복 확인 */}
            <label>닉네임</label>
            <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                required
            />
            <button type="button" onClick={handleNicknameCheck}>닉네임 중복 확인</button>
            {nicknameAvailable !== null && (
                <span>
                    {nicknameAvailable ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.'}
                </span>
            )}

            {/* 핸드폰 번호 입력 */}
            <label>핸드폰 번호</label>
            <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange} // 핸드폰 번호 처리 핸들러
                required
            />

            {/* 생년월일 입력 */}
            <label>생년월일</label>
            <input
                type="text"
                name="birthday"
                value={formData.birthday}
                onChange={handleBirthdayChange} // 생년월일 처리 핸들러
                required
            />

            {/* 주소 입력 */}
            <label>주소</label>
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                readOnly // 주소는 읽기 전용
            />
            <button type="button" onClick={() => setIsPopupOpen(true)}>주소 찾기</button>

            {/* 주소 상세 입력 */}
            <label>주소 상세</label>
            <input
                type="text"
                name="addressDetail"
                value={formData.addressDetail}
                onChange={handleInputChange}
            />

            {/* 인증 코드 전송 */}
            <button
                type="button"
                onClick={handleSendCode}
                disabled={isButtonDisabled}
            >
                인증 코드 전송
            </button>

            {isCodeSent && (
                <>
                    <label>인증 코드</label>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <button type="button" onClick={handleVerifyCode}>코드 확인</button>
                    {message && <p>{message}</p>}
                </>
            )}

            {/* 이용약관 동의 */}
            <label>
                <input
                    type="checkbox"
                    checked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                />
                약관에 동의합니다.
            </label>

            {/* 회원가입 버튼 */}
            <button type="submit" disabled={loading}>
                회원가입
            </button>
        </form>
    );
};

export default SignupFormUI;
