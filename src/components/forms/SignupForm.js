import React, { useState, useEffect } from 'react';
import { request } from '../../apis/Api';
import AddressPopup from './AddressPopup';
import TermsPopup from './TermsPopup';
import SuccessScreen from './SuccessScreen';
import SignupFormUI from './SignupFormUI';
import EmailDomainSelector from './EmailDomainSelector';
import styles from '../../css/SignupForm.module.css';
import { useNavigate } from 'react-router-dom';

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

const SignupForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [selectedDomain, setSelectedDomain] = useState('');
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

    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (isCodeSent && timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isCodeSent, timer]);

    const handleBirthdayChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 8) return;
        let formatted = value.length === 8 ? value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') : value;
        setFormData(prev => ({ ...prev, birthday: formatted }));
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length > 11) return;
        let formatted = value.length === 11 ? value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') : value;
        setFormData(prev => ({ ...prev, phone: formatted }));
    };

    const handleEmailCheck = async () => {
        if (!formData.email) return showAlert('이메일을 입력해주세요.');

        const fullEmail = `${formData.email}${selectedDomain}`;
        try {
            const { available } = await request('GET', `/check-email?email=${fullEmail}`);
            setEmailAvailable(available);
            showAlert(available ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.');
        } catch (error) {
            console.error('이메일 중복 확인 오류:', error);
        }
    };

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

    const handleAddressSelect = (selectedAddress) => {
        // 팝업을 닫기 전에 상태 업데이트
        setFormData(prev => ({
            ...prev,
            address: selectedAddress.roadFullAddr,
            addressDetail: selectedAddress.addressDetail,
        }));
    
        // 팝업 닫기
        if (isPopupOpen) {
            setIsPopupOpen(false);
        }
    };
    
    // useEffect를 사용해 상태 변경을 감지
    useEffect(() => {
        if (!isPopupOpen) {
        }
    }, [isPopupOpen]);

    const handleDomainChange = (e) => {
        setSelectedDomain(e.target.value);
    };

    const handleEmailChange = (e) => {
        setFormData(prev => ({ ...prev, email: e.target.value }));
    };

    const handleSendCode = async () => {
        if (isButtonDisabled) return setMessage('5분 후에 다시 시도할 수 있습니다.');

        const fullEmail = `${formData.email}${selectedDomain}`;
        try {
            const response = await request('POST', '/signup-send-verification-code', { email: fullEmail });
            setMessage(response.message);
            setIsCodeSent(true);
            setIsButtonDisabled(true);
            setTimer(300); // 타이머 초기화
        } catch (error) {
            setMessage(error.response?.data?.message || '알 수 없는 오류가 발생했습니다.');
        }
    };

    const handleVerifyCode = async () => {
        const fullEmail = `${formData.email}${selectedDomain}`;
        try {
            const response = await request('POST', '/signup-verify-code', {
                email: fullEmail,
                verificationCode
            });

            if (response.success) {
                setMessage('인증 완료되었습니다!');
            } else {
                setMessage('인증 실패하였습니다.');
            }
        } catch (error) {
            console.error('인증 코드 확인 오류:', error);
            setMessage(error.response?.data?.message || '알 수 없는 오류가 발생했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormIncomplete(formData)) return alert('모든 필드를 채워야 합니다.');
        if (!isEmailAndNicknameValid(emailAvailable, nicknameAvailable)) return alert('이메일과 닉네임 중복 확인을 완료해주세요.');
        if (!isAgreed) return alert('이용약관에 동의해야 합니다.');

        if (!isCodeSent || !verificationCode) {
            return alert('인증 코드를 입력해야 합니다.');
        }

        setLoading(true);
        try {
            const finalAddress = `${formData.address} ${formData.addressDetail}`.trim();
            await request('POST', '/signup', { ...formData, address: finalAddress });
            setIsSuccess(true);
        } catch (error) {
            alert('회원가입에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2>이메일</h2>
            {isSuccess ? (
                <SuccessScreen navigate={navigate} />
            ) : (
                <>
                    <EmailDomainSelector
                        selectedDomain={selectedDomain}
                        onDomainChange={handleDomainChange}
                        onEmailChange={handleEmailChange}
                        handleEmailCheck={handleEmailCheck}
                        emailAvailable={emailAvailable}
                        handleSendCode={handleSendCode}
                        handleVerifyCode={handleVerifyCode} // 인증 코드 확인 함수 전달
                        verificationCode={verificationCode} // verificationCode를 prop으로 전달
                        setVerificationCode={setVerificationCode} // setVerificationCode를 prop으로 전달
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

// 공통 함수 정의
const showAlert = (message) => alert(message);
const isFormIncomplete = (formData) => Object.values(formData).some((value) => !value);
const isEmailAndNicknameValid = (emailAvailable, nicknameAvailable) => emailAvailable !== null && nicknameAvailable !== null;

export default SignupForm;
