import React, { useState } from 'react';
import TermsPopup from './TermsPopup';
import style from '../../css/SignupFormUI.module.css'; // 스타일 모듈 임포트

const SignupFormUI = ({
    formData,
    setFormData,
    nicknameAvailable,
    handleNicknameCheck,
    handleSubmit,
    loading,
    isAgreed,
    setIsAgreed,
    setIsPopupOpen,
    handlePhoneChange,
    handleBirthdayChange
}) => {

    const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(false);

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
        <form onSubmit={handleSubmit} className={style.container}>
            <h2>회원가입</h2>

            {/* 이름 입력 */}
            <label>이름</label>
            <br />
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={style.input}
            />
            <br />
            {/* 비밀번호 입력 */}
            <label>비밀번호</label>
            <br />
            <div className={style.passwordInputContainer}>
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handlePasswordChange}
                    required
                    className={style.input}
                />
                <button
                    type="button"
                    className={style.showPasswordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? '숨기기' : '표시'}
                </button>
            </div>
            {passwordStrength && <p>비밀번호 강도: {passwordStrength}</p>}

            {/* 비밀번호 확인 */}
            <label>비밀번호 확인</label>
            <div className={style.passwordInputContainer}>
                <br />
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    className={style.input}
                />
                <button
                    type="button"
                    className={style.showPasswordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    {showConfirmPassword ? '숨기기' : '표시'}
                </button>
            </div>
            {!passwordMatch && <p style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</p>}

            {/* 닉네임 입력 및 중복 확인 */}
            <label>닉네임</label>
            <br />
            <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                required
                className={style.input}
            />
            <button type="button" onClick={handleNicknameCheck} className={style.button}>닉네임 중복 확인</button>
            {nicknameAvailable !== null && (
                <span>
                    {nicknameAvailable ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.'}
                </span>
            )}
            <br />
            {/* 핸드폰 번호 입력 */}
            <label>핸드폰 번호</label>
            <br />
            <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                required
                className={style.input}
            />
            <br />
            {/* 생년월일 입력 */}
            <label>생년월일</label>
            <br />
            <input
                type="text"
                name="birthday"
                value={formData.birthday}
                onChange={handleBirthdayChange}
                required
                className={style.input}
            />
            <br />
            {/* 주소 입력 */}
            <label>주소</label>
            <br />
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                readOnly
                className={style.input}
            />
            <button type="button" onClick={() => setIsPopupOpen(true)} className={style.button}>주소 찾기</button>
            <br />
            {/* 주소 상세 입력 */}
            <label>주소 상세</label>
            <br />
            <input
                type="text"
                name="addressDetail"
                value={formData.addressDetail}
                onChange={handleInputChange}
                className={style.input}
            />

            <br />
            {/* 약관 동의 체크박스 */}
            <label>
                <input
                    type="checkbox"
                    checked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                />
                <span>이용 약관에 동의합니다.</span>
                <button type="button" onClick={() => setIsTermsPopupOpen(true)} className={style.button}>약관 보기</button>
            </label>
            <br />
            {/* 약관 팝업 */}
            {isTermsPopupOpen && (
                <div className={style.modalBackground}>
                    <div className={style.modal}>
                        <TermsPopup />
                        <button
                            className={style.modalCloseButton}
                            onClick={() => setIsTermsPopupOpen(false)}
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}

            {/* 가입 버튼 */}
            <button
                type="submit"
                disabled={loading}
                className={style.submitButton}
            >
                {loading ? '처리 중...' : '회원가입'}
            </button>
        </form>
    );
};

export default SignupFormUI;
