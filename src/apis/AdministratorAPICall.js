import { tokenRequest } from "./Api";

// 토큰을 가져오는 헬퍼 함수
const getAuthToken = () => {
    return sessionStorage.getItem("token");
};

// 모든 회원 정보 가져오기
export const getAllMembers = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await tokenRequest(token,"GET",'/admin/members', {
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`,
            },
        });
        return {
            success: true,
            data: response.result,
        };
    } catch (error) {
        console.error("Error fetching members:", error);
        return {
            success: false,
            message: error.response ? error.response.data.message : "서버와의 연결에 문제가 발생했습니다.",
        };
    }
};

// 회원 정보 업데이트
export const updateMemberInfo = async (email, updatedData) => {
    try {
        const token = sessionStorage.getItem('token');
        const response = await tokenRequest(token,"PUT",
            `/admin/update/${email}`,
            updatedData,
        );
        return {
            success: true,
            message: response.message,
        };
    } catch (error) {
        console.error("Error updating member:", error);
        return {
            success: false,
            message: error.response ? error.response.data.message : "서버와의 연결에 문제가 발생했습니다.",
        };
    }
};
