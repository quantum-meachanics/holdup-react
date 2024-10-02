import { tokenRequest } from './Api';

// 인증 코드 전송 함수
export const sendVerificationCode = async (email) => {
    try {
        const token = sessionStorage.getItem("token"); // 세션에서 토큰 가져오기
        const response = await tokenRequest(token, 'POST', '/send-verification-code', { email });
        return { success: true, message: '인증 코드가 성공적으로 전송되었습니다.', data: response };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "알 수 없는 오류가 발생했습니다." };
    }
};

// 인증 코드 확인 및 비밀번호 변경 함수
export const verifyCodeAndChangePassword = async (email, verificationCode, newPassword) => {
    try {
        const token = sessionStorage.getItem("token"); // 세션에서 토큰 가져오기
        const response = await tokenRequest(token, 'POST', '/verify-code', { email, verificationCode, newPassword });
        return { success: true, message: '비밀번호가 성공적으로 변경되었습니다.', data: response };
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "알 수 없는 오류가 발생했습니다." };
    }
};
