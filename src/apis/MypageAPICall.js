import { tokenRequest } from './Api'; // API 요청 함수
import { tokenCreditRequest } from './Api'; // API 요청 함수

// 회원 정보 수정 함수
export const updateUserInfo = async (token, userData) => {
    const { address = '', addressDetail = '', ...rest } = userData; // 기본값 설정

    try {
        // address와 addressDetail을 별도로 전송
        const response = await tokenRequest(token, "PUT", `/update/${rest.email}`, { 
            ...rest, 
            address, // address 전송
            addressDetail // addressDetail 전송
        });

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
        const response = await tokenCreditRequest(token, "POST", `/check-password`, {
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

// 크레딧 충전
export const rechargeCredits = async (email, amount) => {
    try {
        const token = sessionStorage.getItem("token");

        // email과 amount를 포함하여 요청
        const response = await tokenRequest(token, 'PUT', `/${email}/recharge-credits`, { amount });

        console.log("충전 API 응답:", response); // 응답 로그 추가
        return response; // 성공적인 응답 반환
    } catch (error) {
        console.error('Error recharging credits:', error);
        throw error; // 오류를 호출자에게 전파
    }
};

// 회원 정보 가져오기 함수
export const fetchUserInfo = async (token, email) => {
    try {
        const response = await tokenRequest(token, "GET", `/member?email=${email}`);

        // 응답의 success 속성을 체크 (상황에 따라 success 속성을 확인해야 할 수도 있음)
        if (response && response.message === '사용자 조회를 성공했습니다.') {
            return response.result; // 성공적으로 데이터를 반환
        } else {
            throw new Error(response.message || "회원 정보 조회 실패"); // 실패 시 오류 던지기
        }
    } catch (error) {
        console.error("회원 정보 조회 요청 오류:", error);
        throw new Error(error.message || "회원 정보 조회 요청 중 오류가 발생했습니다."); // 오류를 다시 던짐
    }
};
