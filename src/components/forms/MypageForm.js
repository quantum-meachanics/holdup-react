import React, { useEffect, useState } from 'react';
import { myPageAPICall } from '../../apis/MypageAPICall'; // API 호출 함수
import styles from '../../css/MyPage.module.css'; // CSS 모듈

const MyPageForm = () => {
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보를 저장할 상태
    const [message, setMessage] = useState(''); // 메시지 상태

    useEffect(() => {
        const fetchUserInfo = async () => {
            const result = await myPageAPICall(); // 사용자 정보 요청

            if (result.success) {
                setUserInfo(result.data); // 사용자 정보 설정
            } else {
                setMessage(result.message); // 오류 메시지 설정
            }
        };

        fetchUserInfo(); // 컴포넌트 마운트 시 사용자 정보 요청
    }, []);

    return (
        <div className={styles.myPageContainer}>
            <h2>내 정보</h2>
            {userInfo ? (
                <div className={styles.userInfo}>
                    <p>이름: {userInfo.name}</p>
                    <p>이메일: {userInfo.email}</p>
                    <p>닉네임: {userInfo.nickname}</p>
                    <p>전화번호: {userInfo.phone}</p>
                    <p>주소: {userInfo.address}</p>
                    <p>생년월일: {userInfo.birthday}</p>
                    <p>크레딧: {userInfo.credit}</p>
                    <p>포인트: {userInfo.point}</p>
                    <p>회원가입일: {userInfo.entDate}</p>
                    <p>회원 등급: {userInfo.role}</p>
                </div>
            ) : (
                <p>{message || "정보를 불러오는 중..."}</p>
            )}
        </div>
    );
};

export default MyPageForm;