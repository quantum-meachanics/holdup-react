import React from 'react';
import { rechargeCredits } from '../../apis/MypageAPICall'; // 크레딧 충전 API 호출 함수

const CreditPage = () => {
    const handleRecharge = async (amount) => {
        const token = sessionStorage.getItem("token");
        const userInfo = sessionStorage.getItem("user"); // 'user'로 수정

        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        if (!userInfo) {
            alert("이메일 정보를 찾을 수 없습니다.");
            return;
        }

        // 사용자 정보를 JSON으로 파싱하고 이메일만 추출
        let email;
        try {
            const user = JSON.parse(userInfo); // JSON 파싱
            email = user.email; // 이메일 추출
        } catch (error) {
            alert("사용자 정보가 유효하지 않습니다.");
            console.error("JSON 파싱 오류:", error);
            return;
        }

        try {
            const result = await rechargeCredits(email, amount); // email 전달
            console.log("API 응답:", result); // 응답 로그 추가
            if (result && result.success) {
                alert(result.message);
            } else {
                alert(result ? result.message : "충전 요청 처리 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("충전 중 오류 발생:", error);
            alert("충전 요청 처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <h1>크레딧 충전</h1>
            <div>
                <button onClick={() => handleRecharge(5000)}>5,000원 충전</button>
                <button onClick={() => handleRecharge(10000)}>10,000원 충전</button>
                <button onClick={() => handleRecharge(50000)}>50,000원 충전</button>
            </div>
        </div>
    );
};

export default CreditPage;
