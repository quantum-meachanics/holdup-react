import { request } from './Api';

// 이메일 중복 확인
export const handleEmailCheck = async (formData, selectedDomain, setEmailAvailable, showAlert) => {
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

// 닉네임 중복 확인
export const handleNicknameCheck = async (formData, setNicknameAvailable, showAlert) => {
    if (!formData.nickname) return showAlert('닉네임을 입력해주세요.');

    try {
        const { available } = await request('GET', `/check-nickname?nickname=${formData.nickname}`);
        setNicknameAvailable(available);
        showAlert(available ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.');
    } catch (error) {
        console.error('닉네임 중복 확인 오류:', error);
    }
};

// 인증 코드 발송
export const handleSendCode = async (formData, selectedDomain, setMessage, setIsCodeSent, setIsButtonDisabled, setTimer, emailAvailable, showAlert) => {
    if (emailAvailable === false) return showAlert('이미 사용 중인 이메일입니다.');

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

// 인증코드 처리
export const handleVerifyCode = async (formData, selectedDomain, verificationCode, setMessage, setIsEmailEditable) => {
    const fullEmail = `${formData.email}${selectedDomain}`;
    try {
        const response = await request('POST', '/signup-verify-code', {
            email: fullEmail,
            verificationCode
        });

        // API 응답 로그 추가
        console.log("API 응답:", response); // 응답 데이터 확인

        // API 응답에서 success와 message를 확인
        return {
            success: response.success !== undefined ? response.success : response.data.success, // success 체크
            message: response.message !== undefined ? response.message : response.data.message // message 체크
        };
    } catch (error) {
        console.error('인증 코드 확인 오류:', error);
        return { success: false, message: error.response?.data?.message || '알 수 없는 오류가 발생했습니다.' };
    }
};

// 제출 처리
export const handleSubmit = async (e, formData, selectedDomain, setLoading, setIsSuccess, emailAvailable, nicknameAvailable, isAgreed, isCodeSent, verificationCode) => {
    e.preventDefault();
    
    if (isFormIncomplete(formData)) return alert('모든 필드를 채워야 합니다.');
    if (!isEmailAndNicknameValid(emailAvailable, nicknameAvailable)) return alert('이메일과 닉네임 중복 확인을 완료해주세요.');
    if (!isAgreed) return alert('이용약관에 동의해야 합니다.');

    if (!isCodeSent || !verificationCode) {
        return alert('인증 코드를 입력해야 합니다.');
    }

    setLoading(true);
    try {
        const finalEmail = `${formData.email}${selectedDomain}`; // 이메일 도메인과 결합
        await request('POST', '/signup', { ...formData, email: finalEmail }); // 최종 이메일과 주소 포함
        setIsSuccess(true);
    } catch (error) {
        alert('회원가입에 실패했습니다.');
    } finally {
        setLoading(false);
    }
};

// 폼 검증
const isFormIncomplete = (data) => {
    return !(
        data.email &&
        data.password &&
        data.confirmPassword &&
        data.nickname &&
        data.phone &&
        data.name &&
        data.birthday &&
        data.address &&
        data.addressDetail
    );
};

const isEmailAndNicknameValid = (emailAvailable, nicknameAvailable) => {
    return emailAvailable === true && nicknameAvailable === true;
};
