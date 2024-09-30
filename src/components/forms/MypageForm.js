import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetLoginUser, logoutUser } from '../../modules/UserModule'; // 액션 가져오기
import { updateUserInfo } from '../../apis/MypageAPICall'; // API 요청 함수 추가

const MyPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보를 상태로 관리
    const [updatedInfo, setUpdatedInfo] = useState({
        id: '',
        password: '',
        nickname: '',
        email: '', // email 추가
    });
    const isLogin = sessionStorage.getItem("isLogin") === "true"; // sessionStorage에서 로그인 상태 확인

    useEffect(() => {
        // sessionStorage에서 사용자 정보 가져오기
        const storedUserInfo = sessionStorage.getItem("user");
        if (storedUserInfo) {
            const user = JSON.parse(storedUserInfo); // JSON 문자열을 객체로 변환하여 상태에 저장
            setUserInfo(user);
            setUpdatedInfo({
                id: user.id, // id 초기값 설정
                nickname: user.nickname,
                email: user.email // email 초기값 설정
            });
        }

        // 컴포넌트 언마운트 시 로그인 상태 리셋
        return () => {
            dispatch(resetLoginUser());
        };
    }, [isLogin, navigate, dispatch]);

    const handleLogout = () => {
        dispatch(logoutUser()); // 로그아웃 액션 호출
        sessionStorage.removeItem("isLogin"); // sessionStorage에서 로그인 상태 제거
        sessionStorage.removeItem("user"); // sessionStorage에서 사용자 정보 제거
        navigate('/holdup/login'); // 로그아웃 후 로그인 페이지로 리다이렉트
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInfo(prev => ({ ...prev, [name]: value })); // 입력값 상태 업데이트
    };

    const handleUpdateUserInfo = async () => {
        try {
            const token = sessionStorage.getItem("token"); // 토큰 가져오기
            const response = await updateUserInfo(token, {
                email: userInfo.email, // 이메일 포함
                ...updatedInfo // 다른 수정할 정보
            });
            setUserInfo(response.userInfo); // 수정된 사용자 정보로 상태 업데이트
            sessionStorage.setItem("user", JSON.stringify(response.userInfo)); // sessionStorage에 수정된 정보 저장
            alert("회원 정보가 수정되었습니다.");
        } catch (error) {
            alert(error.message); // 에러 처리
        }
    };

    return (
        <div className="mypage-container">
            <h1>마이 페이지</h1>
            {isLogin && userInfo ? (
                <div>
                    <p>사용자 ID: {userInfo.id}</p>
                    <h2>환영합니다, {userInfo.nickname}님!</h2>
                    <p>이메일: {userInfo.email}</p>
                    <p>역할: {userInfo.role}</p>

                    <h3>회원 정보 수정</h3>
                    <div>
                        <label>
                            닉네임:
                            <input
                                type="text"
                                name="nickname"
                                value={updatedInfo.nickname}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            비밀번호:
                            <input
                                type="password"
                                name="password"
                                value={updatedInfo.password}
                                onChange={handleInputChange}
                            />
                        </label>
                        <button onClick={handleUpdateUserInfo}>정보 수정</button>
                    </div>

                    <button onClick={handleLogout}>로그아웃</button>
                </div>
            ) : (
                <div>
                    <h2>로그인이 필요합니다</h2>
                    <p>마이 페이지에 접근하려면 로그인을 해주세요.</p>
                    <button onClick={() => navigate('/holdup/login')}>로그인 페이지로 이동</button>
                </div>
            )}
        </div>
    );
};

export default MyPage;
