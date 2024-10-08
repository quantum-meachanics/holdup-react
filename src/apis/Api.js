import axios from "axios";

const DOMAIN = "http://localhost:8080/holdup";

export const request = async (method, url, data) => {
    try {
        const response = await axios({
            method,
            url: `${DOMAIN}${url}`,
            data
        });
        console.log("api에서 response 확인 : ", response);
        return response.data; // response.data 반환
    } catch (error) {
        console.error('API 요청 오류', error); // 오류 로그
        throw error; // 오류를 다시 던져서 호출 측에서 처리하도록 함
    }
};

export const tokenRequest = async (token, method, url, data) => {
    try {
        const response = await axios({
            method,
            url: `${DOMAIN}${url}`,
            headers: { Authorization: `Bearer ${token}` }, // 'Content-Type' 추가 하지 마세요
            data
        });

        console.log("최종 response data 확인", response.data);

        return response.data;

    } catch (error) {
        console.error("API 요청 오류", error);
        throw error;
    }
};

export const tokenCreditRequest = async (token, method, url, body) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // 토큰 추가
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // JSON 응답 반환
};
