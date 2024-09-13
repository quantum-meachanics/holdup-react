import axios from "axios";

const DOMAIN = "http://localhost:8080";

export const request = async (method, url, data) => {
    try {
        const response = await axios({
            method,
            url: `${DOMAIN}${url}`,
            data
        });

        console.log("api에서 response 확인 : ", response);

        return response.data;

    } catch (error) {
        console.error('API 요청 오류', error); // 오류 로그
        throw error; // 오류를 다시 던져서 호출 측에서 처리하도록 함
    }
}
