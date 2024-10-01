import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logoutUser } from '../../modules/UserModule'; // 로그아웃 액션 가져오기
import { updateUserInfo } from '../../apis/MypageAPICall';
import AddressPopup from './AddressPopup'; // AddressPopup 컴포넌트 import

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
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user") || "null");
        if (user) {
            setUserInfo(prevInfo => ({
                ...prevInfo,
                ...user,
                address: user.address || '',
                addressDetail: '', // 초기 상세 주소는 빈 문자열로 설정
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
        if (selectedAddress) {
            setUserInfo(prev => ({
                ...prev,
                address: selectedAddress.roadFullAddr,
                addressDetail: '', // 상세주소는 사용자에게 입력받기
            }));
        }
        setIsPopupOpen(false); // 팝업 닫기
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

            const fullAddress = `${userInfo.address} ${userInfo.addressDetail}`.trim(); // 전체 주소 결합

            const response = await updateUserInfo(token, {
                email: userInfo.email,
                nickname: userInfo.nickname,

                newPassword: password.new || undefined,
                address: fullAddress,

                address: userInfo.address,
                addressDetail: userInfo.addressDetail,

            });

            if (response.success) {
                alert(response.message);
                // 세션 스토리지의 사용자 정보 업데이트
                sessionStorage.setItem("user", JSON.stringify({
                    ...userInfo,
                    address: fullAddress,
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
        // 로그아웃 처리
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        dispatch(logoutUser()); // Redux 액션으로 로그아웃
        navigate('/holdup/login'); // 로그인 페이지로 이동
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
                            readOnly // 주소는 팝업으로 선택하도록 수정
                        />
                        <button type="button" onClick={() => setIsPopupOpen(true)}>주소 선택</button>
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
                <button type="submit">정보 수정</button>
            </form>

            <button onClick={handleLogout}>로그아웃</button>

            {isPopupOpen && <AddressPopup onAddressSelect={handleAddressSelect} />}
        </div>
    );
};

export default MyPage;
