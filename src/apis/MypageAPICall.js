import { tokenRequest } from './Api'; // API 요청 함수

export async function updateUserInfo(token, updatedInfo) {
    try {
        const response = await tokenRequest(token, "PUT", "/update", updatedInfo);
        return response; // 수정된 사용자 정보 반환
    } catch (error) {
        throw new Error("회원 정보 수정 실패: " + error.message); // 오류 처리
    }
}

