import { tokenRequest } from './Api'; // API 요청 함수

// 회원 정보 수정 함수
export const updateUserInfo = async (token, userData) => {
    const { address = '', addressDetail = '', ...rest } = userData; // 기본값 설정
    const combinedAddress = `${address.trim()} ${addressDetail.trim()}`.trim(); // 주소와 상세 주소 합치기

    try {
        const response = await tokenRequest(token, "PUT", `/update/${rest.email}`, { ...rest, address: combinedAddress });

        if (response.success) {
            return { success: true, message: "회원 정보가 성공적으로 수정되었습니다." };
        } else {
            return { success: false, message: response.message || "회원 정보 수정에 실패했습니다." };
        }
    } catch (error) {
        console.error("회원 정보 수정 요청 오류", error);
        
        if (error.response) {
            return { success: false, message: `서버 오류: ${error.response.status} ${error.response.data?.message || ''}` };
        } else if (error.request) {
            return { success: false, message: "서버로부터 응답을 받지 못했습니다. 네트워크 연결을 확인해주세요." };
        } else {
            return { success: false, message: "요청 설정 중 오류가 발생했습니다." };
        }
    }
};

// 비밀번호 확인 함수
export const checkPassword = async (token, email, currentPassword) => {
    try {
        const response = await tokenRequest(token, "POST", `/check-password`, {
            email,
            currentPassword,
        });

        // 서버의 응답에서 success 속성 확인
        if (response.success) {
            return response; // 성공적인 응답 반환
        } else {
            throw new Error(response.message || "비밀번호 확인 실패"); // 실패 시 오류 던지기
        }
    } catch (error) {
        console.error("비밀번호 확인 요청 오류:", error);
        throw new Error(error.message || "비밀번호 확인 요청 중 오류가 발생했습니다."); // 오류를 다시 던짐
    }
};
