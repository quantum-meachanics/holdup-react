import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logoutUser } from '../../modules/UserModule'; // 로그아웃 액션 가져오기
import { updateUserInfo } from '../../apis/MypageAPICall';
import AddressPopup from './AddressPopup'; // AddressPopup 컴포넌트 가져오기

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
    const [errors, setErrors] = useState({});
    const [showAddressPopup, setShowAddressPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressSelect = (selectedAddress) => {
        setUserInfo(prev => ({
            ...prev,
            address: selectedAddress.roadFullAddr,
            addressDetail: '', // 주소 선택 시 상세 주소 초기화
        }));
        setShowAddressPopup(false); // 팝업 닫기
    };

    const handleUpdateUserInfo = async () => {
        // 유효성 검사
        if (!userInfo.nickname) {
            setErrors({ general: "닉네임을 입력해주세요." });
            return;
        }

        setErrors({}); // 에러 초기화
        setIsLoading(true); // 로딩 시작

        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                setErrors({ general: "인증 정보가 없습니다. 다시 로그인 해주세요." });
                return;
            }

            const response = await updateUserInfo(token, {
                email: userInfo.email,
                nickname: userInfo.nickname,
                address: userInfo.address,
                addressDetail: userInfo.addressDetail,
            });

            if (response.success) {
                alert(response.message);
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
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        dispatch(logoutUser());
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
                        주소:
                        <input
                            type="text"
                            name="address"
                            value={userInfo.address}
                            readOnly
                        />
                        <button type="button" onClick={() => setShowAddressPopup(true)}>주소 선택</button>
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
                <button type="submit" disabled={isLoading}>{isLoading ? "로딩 중..." : "정보 수정"}</button>
            </form>

            <button onClick={handleLogout}>로그아웃</button>

            {showAddressPopup && <AddressPopup onAddressSelect={handleAddressSelect} />}
        </div>
    );
};

export default MyPage;
