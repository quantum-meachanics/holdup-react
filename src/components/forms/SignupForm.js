import React, { useState } from 'react';
import { request } from '../../apis/Api';
import AddressPopup from './AddressPopup';
import TermsPopup from './TermsPopup';
import SuccessScreen from './SuccessScreen';
import SignupFormUI from './SignupFormUI';
import EmailDomainSelector from './EmailDomainSelector';
import styles from '../../css/SignupForm.module.css';

const SignupForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [selectedDomain, setSelectedDomain] = useState('@gmail.com');
    const [loading, setLoading] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState(null);
    const [nicknameAvailable, setNicknameAvailable] = useState(null);
    const [isAgreed, setIsAgreed] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [message, setMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [timer, setTimer] = useState(300); // 5분 타이머
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남김
        let formatted = '';

        if (value.length > 10) {
            formatted = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 010-xxxx-xxxx
        } else if (value.length > 6) {
            formatted = value.replace(/(\d{3})(\d{3})(\d+)/, '$1-$2-$3'); // 010-xxx-xxxx
        } else if (value.length > 3) {
            formatted = value.replace(/(\d{3})(\d+)/, '$1-$2'); // 010-xx
        } else {
            formatted = value;
        }

        setFormData({ ...formData, phone: formatted });
    };

    const handleBirthdayChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남김
        let formatted = '';

        if (value.length > 8) {
            formatted = value.slice(0, 8);
        } else {
            formatted = value;
        }

        if (formatted.length >= 4) {
            formatted = `${formatted.slice(0, 4)}-${formatted.slice(4, 6)}`; // YYYY-MM
        }
        if (formatted.length >= 7) {
            formatted = `${formatted.slice(0, 7)}-${formatted.slice(7, 9)}`; // YYYY-MM-DD
        }

        setFormData({ ...formData, birthday: formatted });
    };

    // 이메일 중복 확인
    const handleEmailCheck = async () => {
        if (!formData.email) return showAlert('이메일을 입력해주세요.');
        try {
            const { available } = await request('GET', `/check-email?email=${formData.email}`);
            setEmailAvailable(available);
            showAlert(available ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.');
        } catch (error) {
            console.error('이메일 중복 확인 오류:', error);
        }
    };

    // 닉네임 중복 확인
    const handleNicknameCheck = async () => {
        if (!formData.nickname) return showAlert('닉네임을 입력해주세요.');
        try {
            const { available } = await request('GET', `/check-nickname?nickname=${formData.nickname}`);
            setNicknameAvailable(available);
            showAlert(available ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.');
        } catch (error) {
            console.error('닉네임 중복 확인 오류:', error);
        }
    };

    // 주소 선택
    const handleAddressSelect = (selectedAddress) => {
        setFormData({
            ...formData,
            address: selectedAddress.roadFullAddr,
            addressDetail: selectedAddress.addressDetail,
        });
        setIsPopupOpen(false);
    };

    // 이메일 도메인 변경 핸들러
    const handleDomainChange = (e) => {
        setSelectedDomain(e.target.value);
    };

    // 이메일 변경 핸들러
    const handleEmailChange = (e) => {
        setFormData({ ...formData, email: e.target.value + selectedDomain });
    };

    // 인증 코드 전송
    const handleSendCode = async (e) => {
        e.preventDefault();
        if (isButtonDisabled) return setMessage('5분 후에 다시 시도할 수 있습니다.');

        try {
            const response = await request('POST', '/signup-send-verification-code', { email: formData.email });
            setMessage(response.message);
            setIsCodeSent(true);
            setIsButtonDisabled(true);
            setTimer(300);
        } catch (error) {
            setMessage(error.response?.data?.message || '알 수 없는 오류가 발생했습니다.');
        }
    };

    // 인증 코드 검증
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        try {
            const response = await request('POST', '/signup-verify-code', { email: formData.email, verificationCode });
            setMessage(response.data?.message || '인증 코드 검증 실패');
            if (response.data?.success) setIsSuccess(true);
        } catch (error) {
            const errorMessage = error.response?.data?.message || '알 수 없는 오류가 발생했습니다.';
            console.error('Verification error:', error);
            setMessage(errorMessage);
        }
    };

    // 회원가입 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormIncomplete(formData)) return alert('모든 필드를 채워야 합니다.');
        if (!isEmailAndNicknameValid(emailAvailable, nicknameAvailable)) return;
        if (!isAgreed) return alert('이용약관에 동의해야 합니다.');

        setLoading(true);
        try {
            const finalAddress = `${formData.address} ${formData.addressDetail}`.trim();
            await request('POST', '/signup', { ...formData, address: finalAddress });
            alert('회원가입 성공!');
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('회원가입에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {isSuccess ? <SuccessScreen navigate={'holdup/login'} /> : (
                <>
                    <EmailDomainSelector
                        selectedDomain={selectedDomain}
                        onDomainChange={handleDomainChange}
                        onEmailChange={handleEmailChange}
                    />
                    <SignupFormUI
                        formData={formData}
                        setFormData={setFormData}
                        emailAvailable={emailAvailable}
                        nicknameAvailable={nicknameAvailable}
                        handleEmailCheck={handleEmailCheck}
                        handleNicknameCheck={handleNicknameCheck}
                        handleSendCode={handleSendCode}
                        verificationCode={verificationCode}
                        setVerificationCode={setVerificationCode}
                        handleVerifyCode={handleVerifyCode}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        message={message}
                        isCodeSent={isCodeSent}
                        isButtonDisabled={isButtonDisabled}
                        timer={timer}
                        isAgreed={isAgreed}
                        setIsAgreed={setIsAgreed}
                        handleAddressSelect={handleAddressSelect}
                        setIsPopupOpen={setIsPopupOpen}
                        handlePhoneChange={handlePhoneChange} 
                        handleBirthdayChange={handleBirthdayChange} 
                    />
                </>
            )}
            {isPopupOpen && <AddressPopup onAddressSelect={handleAddressSelect} />}
            {isTermsPopupOpen && <TermsPopup onClose={() => setIsTermsPopupOpen(false)} />}
        </div>
    );
};

// 초기 form 데이터 정의
const initialFormData = {
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    phone: '',
    name: '',
    birthday: '',
    address: '',
    addressDetail: '',
};

// 공통 함수 정의
const showAlert = (message) => alert(message);
const isFormIncomplete = (formData) => Object.values(formData).some((value) => !value);
const isEmailAndNicknameValid = (emailAvailable, nicknameAvailable) => emailAvailable !== null && nicknameAvailable !== null;

export default SignupForm;
