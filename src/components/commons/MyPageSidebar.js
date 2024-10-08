import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { fetchUserInfo } from '../../apis/MypageAPICall'; // API 호출 함수 가져오기
import style from "../../css/MypageSidebar.module.css";

function CommunitySidebar() {
    const navigate = useNavigate();
    const [nickname, setNickname] = useState('');
    const [role, setRole] = useState('');
    const [credit, setCredit] = useState(0);
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 추가

    useEffect(() => {
        const fetchAndSetUserInfo = async () => {
            try {
                // 세션에서 token과 email 가져오기
                const token = sessionStorage.getItem("token");
                const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");

                if (token && storedUser?.email) {
                    // 이메일을 사용하여 회원 정보를 가져오는 API 호출
                    const userData = await fetchUserInfo(token, storedUser.email);

                    // 서버의 응답에서 result 객체의 사용자 정보를 추출
                    if (userData) {
                        const { nickname, role, credit } = userData;

                        // 가져온 회원 정보를 상태에 업데이트
                        setNickname(nickname || "닉네임 없음");
                        setRole(role || "역할 없음");
                        setCredit(credit !== undefined ? credit : 0);

                        // 세션 스토리지의 user 정보 업데이트
                        sessionStorage.setItem("user", JSON.stringify({
                            ...storedUser,
                            ...userData,
                        }));
                    }
                } else {
                    // 로그인 정보가 없으면 로그인 페이지로 이동
                    navigate('/holdup/login');
                }
            } catch (error) {
                console.error("회원 정보 가져오기 실패:", error);
                setErrorMessage("회원 정보를 가져오는 데 실패했습니다. 다시 시도해주세요."); // 오류 메시지 설정
            }
        };

        fetchAndSetUserInfo();
    }, [navigate]);

    return (
        <div className={style.mypageSidebar}>
            <div className={style.infoBox}>
                <p>닉네임 : {nickname}</p>
                <p>역할 : {role}</p>
                <p>크레딧 : {credit}</p>
            </div>
            <div className={style.linkBox}>
                <NavLink to="/holdup/mypage" className={style.link}><p>내 정보</p></NavLink>
                <NavLink to="/holdup/mypage" className={style.link}><p>내 공간</p></NavLink>
                <NavLink to="/holdup/mypage/reservations" className={style.link}><p>내 예약</p></NavLink>
                <NavLink to="/holdup/mypage" className={style.link}><p>내 리뷰</p></NavLink>
                <NavLink to="/holdup/mypage" className={style.link}><p>내 문의</p></NavLink>
                <NavLink to="/holdup/mypage" className={style.link}><p>접수한 신고</p></NavLink>
            </div>
        </div>
    );
}

export default CommunitySidebar;
