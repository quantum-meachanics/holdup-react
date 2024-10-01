import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logoutUser } from '../../modules/UserModule';
import { updateUserInfo } from '../../apis/MypageAPICall';

const MyPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({
        nickname: '',
        email: '',
        role: '',
        address: '',
        addressDetail: '',
    });
    const [password, setPassword] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user") || "null");
        if (user) {
            setUserInfo(prevInfo => ({
                ...prevInfo,
                ...user,
                address: user.address?.split(' ')[0] || '',
                addressDetail: user.address?.split(' ').slice(1).join(' ') || '',
            }));
        } else {
            navigate('/holdup/login');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in userInfo) {
            setUserInfo(prev => ({ ...prev, [name]: value }));
        } else if (name in password) {
            setPassword(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleUpdateUserInfo = async () => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                setErrors({ general: "인증 정보가 없습니다. 다시 로그인 해주세요." });
                return;
            }
    
            // 새 비밀번호와 비밀번호 확인이 일치하는지 확인
            if (password.new && password.new !== password.confirm) {
                setErrors({ password: "새 비밀번호와 비밀번호 확인이 일치하지 않습니다." });
                return;
            }

            console.log("Token:", token);
            console.log("UserInfo:", userInfo);
    
            const response = await updateUserInfo(token, {
                email: userInfo.email,
                currentPassword: password.current,
                nickname: userInfo.nickname,
                newPassword: password.new || undefined,
                address: `${userInfo.address} ${userInfo.addressDetail}`.trim(),
            });
    
            if (response.success) {
                alert(response.message);
                // 세션 스토리지의 사용자 정보 업데이트
                sessionStorage.setItem("user", JSON.stringify({
                    ...userInfo,
                    address: `${userInfo.address} ${userInfo.addressDetail}`.trim(),
                }));
            } else {
                setErrors({ general: response.message });
            }

        } catch (error) {
            console.error("회원 정보 수정 중 오류:", error);
            setErrors({ general: "회원 정보 수정 중 오류가 발생했습니다." });
        }
    };
    
    const handleLogout = () => {
        dispatch(logoutUser());
        sessionStorage.removeItem("isLogin");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
        navigate('/holdup/login');
    };

    return (
        <div className="mypage-container">
            <h1>마이 페이지</h1>
            <h2>환영합니다, {userInfo.nickname}님!</h2>
            <p>이메일: {userInfo.email}</p>
            <p>역할: {userInfo.role}</p>

            <h3>회원 정보 수정</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateUserInfo(); }}>
                <div>
                    <label>
                        현재 비밀번호:
                        <input
                            type="password"
                            name="current"
                            value={password.current}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        닉네임:
                        <input
                            type="text"
                            name="nickname"
                            value={userInfo.nickname}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        새 비밀번호:
                        <input
                            type="password"
                            name="new"
                            value={password.new}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        새 비밀번호 확인:
                        <input
                            type="password"
                            name="confirm"
                            value={password.confirm}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        주소:
                        <input
                            type="text"
                            name="address"
                            value={userInfo.address}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        상세 주소:
                        <input
                            type="text"
                            name="addressDetail"
                            value={userInfo.addressDetail}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                {errors.general && <p className="error">{errors.general}</p>}
                {errors.password && <p className="error">{errors.password}</p>}
                <button type="submit">정보 수정</button>
            </form>

            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default MyPage;
