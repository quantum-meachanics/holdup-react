import React from 'react';
import { rechargeCredits } from '../../apis/MypageAPICall'; // 크레딧 충전 API 호출 함수
import styles from '../../css/CreditPage.module.css';

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
            // API 응답에 따라 알림 처리
            if (result) {
                // 서버에서 보내온 응답 메시지가 있을 때
                alert(result.message || "충전 요청이 처리되었습니다."); 
            } else {
                alert("충전 요청 처리 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("충전 중 오류 발생:", error);
            alert("충전 요청 처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>크레딧 충전</h1>
            <p>크레딧을 통해 더욱 다양한 서비스를 경험해보세요</p>
            <div className={styles.buttonContainer}>
                <div className={styles.card}>
                    <button className={styles.button} onClick={() => handleRecharge(5000)}>
                        <img src={`${process.env.PUBLIC_URL}/images/money1.png`} alt=""/>
                        <br />
                        5,000 크레딧 충전
                        <p className={styles.p}>$5.000</p>
                    </button>
                </div>
                <div className={styles.card}>
                    <button className={styles.button} onClick={() => handleRecharge(10000)}>
                        <img src={`${process.env.PUBLIC_URL}/images/money2.png`} alt=""/>
                        <br />
                        10,000 크레딧 충전
                        <p className={styles.p}>$10.000</p>
                    </button>
                </div>
                <div className={styles.card}>
                    <button className={styles.button} onClick={() => handleRecharge(50000)}>
                        <img src={`${process.env.PUBLIC_URL}/images/money3.png`} alt=""/>
                        <br />
                        50,000 크레딧 충전
                        <p className={styles.p}>$50.000</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreditPage;
