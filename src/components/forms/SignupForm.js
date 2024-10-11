import React, { useState, useEffect } from 'react';
import AddressPopup from './AddressPopup';
import TermsPopup from './TermsPopup';
import SuccessScreen from './SuccessScreen';
import SignupFormUI from './SignupFormUI';
import EmailDomainSelector from './EmailDomainSelector';
import styles from '../../css/SignupForm.module.css';
import { useNavigate } from 'react-router-dom';
import {
    handleEmailCheck,
    handleNicknameCheck,
    handleSendCode,
    handleVerifyCode,
    handleSubmit,
} from '../../apis/SignupFormAPICall';

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
    const [isEmailEditable, setIsEmailEditable] = useState(true);

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

    const showAlert = (msg) => {
        alert(msg);
    };

    const handleEmailCheckClick = async () => {
        await handleEmailCheck(formData, selectedDomain, setEmailAvailable, showAlert);
    };

    const handleNicknameCheckClick = async () => {
        await handleNicknameCheck(formData, setNicknameAvailable, showAlert);
    };

    const handleSendCodeClick = async () => {
        await handleSendCode(
            formData,
            selectedDomain,
            setMessage,
            setIsCodeSent,
            setIsButtonDisabled,
            setTimer,
            emailAvailable,
            showAlert
        );
    };

    const handleVerifyCodeClick = async () => {
        const response = await handleVerifyCode(
            formData,
            selectedDomain,
            verificationCode,
            setMessage,
            setIsEmailEditable
        );
        if (response.success) {
            setIsEmailEditable(false); // 인증 성공 시 이메일 수정 불가
        }
    };

    const handleSubmitClick = async (e) => {
        await handleSubmit(e, formData, selectedDomain, setLoading, setIsSuccess, emailAvailable, nicknameAvailable, isAgreed, isCodeSent, verificationCode);
    };

    return (
        <div className={styles.container}>
            {isSuccess ? (
                <SuccessScreen navigate={navigate} />
            ) : (
                <>
                    <EmailDomainSelector
                        selectedDomain={selectedDomain}
                        onDomainChange={(e) => setSelectedDomain(e.target.value)}
                        onEmailChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        handleEmailCheck={handleEmailCheckClick}
                        emailAvailable={emailAvailable}
                        handleSendCode={handleSendCodeClick}
                        handleVerifyCode={handleVerifyCodeClick}
                        verificationCode={verificationCode}
                        setVerificationCode={setVerificationCode}
                        isEmailEditable={isEmailEditable}
                        formData={formData}
                    />
                    {message && <p className={styles.message}>{message}</p>} {/* 메시지 표시 */}
                    <SignupFormUI
                        formData={formData}
                        setFormData={setFormData}
                        handleNicknameCheck={handleNicknameCheckClick}
                        handleSubmit={handleSubmitClick}
                        loading={loading}
                        isAgreed={isAgreed}
                        setIsAgreed={setIsAgreed}
                        handlePhoneChange={handlePhoneChange}
                        handleBirthdayChange={handleBirthdayChange}
                        handleAddressSelect={(address) => setFormData(prev => ({ ...prev, address }))}
                        setIsPopupOpen={setIsPopupOpen}
                        isButtonDisabled={isButtonDisabled} // 비활성화 상태 전달
                    />
                </>
            )}
            {isPopupOpen && <AddressPopup onAddressSelect={(selectedAddress) => setFormData(prev => ({ ...prev, address: selectedAddress.roadFullAddr }))} />}
            {isTermsPopupOpen && <TermsPopup onClose={() => setIsTermsPopupOpen(false)} />}
        </div>
    );
};

export default SignupForm;
