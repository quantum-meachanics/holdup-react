import { tokenRequest } from './Api'; // API 요청 함수

export const myPageAPICall = async () => {
    try {
        const token = sessionStorage.getItem("token"); // 저장된 JWT 토큰 가져오기
        if (!token) {
            throw new Error("토큰이 존재하지 않습니다.");
        }
        
        const response = await tokenRequest(token, 'GET', '/mypage');
        
        return {
            success: true,
            data: response.data // 사용자 정보
        };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || error.message || "사용자 정보를 가져오는 데 오류가 발생했습니다."
        };
    }
};
