import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo , fetchUserInfo } from '../../apis/MypageAPICall';
import AddressPopup from './AddressPopup';
import styles from '../../css/MyPageForm.module.css';

const MyPage = () => {
    const navigate = useNavigate();
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
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const fetchAndSetUserInfo = async () => {
            try {
                // 세션에서 token과 user 객체 가져오기
                const token = sessionStorage.getItem("token");
                const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
    
                if (token && storedUser?.email) {
                    // 회원 정보를 가져오는 API 호출 (email을 사용)
                    const userData = await fetchUserInfo(token, storedUser.email);
    
                    // 가져온 회원 정보를 userInfo 상태에 업데이트
                    setUserInfo(prevInfo => ({
                        ...prevInfo,
                        ...userData, // 서버에서 가져온 회원 정보 적용
                        address: userData.address || '',
                        addressDetail: userData.addressDetail || '',
                    }));
    
                    // 세션 스토리지의 user 정보 업데이트
                    sessionStorage.setItem("user", JSON.stringify({
                        ...storedUser,
                        ...userData,
                    }));
    
                } else {
                    // 로그인 정보가 없으면 로그인 페이지로 이동
                    navigate('/holdup/login');
                }
            } catch (error) {
                console.error("회원 정보 가져오기 실패:", error);
                // 오류 처리 로직 추가
            }
        };
    
        fetchAndSetUserInfo();
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in userInfo) {
            setUserInfo(prev => ({ ...prev, [name]: value }));
        } else if (name in password) {
            setPassword(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddressSelect = (selectedAddress) => {
        if (selectedAddress) {
            setUserInfo(prev => ({
                ...prev,
                address: selectedAddress.roadFullAddr,
                addressDetail: '',
            }));
        }
        setIsPopupOpen(false);
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

            // API 호출
            const response = await updateUserInfo(token, {
                email: userInfo.email,
                currentPassword: password.current,
                nickname: userInfo.nickname,
                newPassword: password.new || undefined,
                address: userInfo.address,
                addressDetail: userInfo.addressDetail,
            });

            // API 응답 처리
            if (response && response.success) {
                alert(response.message);

                // sessionStorage 및 상태 업데이트
                const updatedUserInfo = {
                    ...userInfo,
                    address: userInfo.address,
                    addressDetail: userInfo.addressDetail,
                };

                setUserInfo(updatedUserInfo); // 상태 업데이트
                sessionStorage.setItem("user", JSON.stringify(updatedUserInfo)); // 세션 스토리지 업데이트

            } else {
                setErrors({ general: response.message || "정보 업데이트에 실패했습니다." });
            }

        } catch (error) {
            console.error("회원 정보 수정 중 오류:", error);
            setErrors({ general: "회원 정보 수정 중 오류가 발생했습니다." });
        }
    };

    return (
        <div className={styles.mypageContainer}>
            <h3 className={styles.sectionTitle}>회원 정보 수정</h3>
            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleUpdateUserInfo(); }}>
                <div>
                    <label className={styles.label}>현재 비밀번호</label>
                    <br />
                    <input
                        type="password"
                        name="current"
                        value={password.current}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                    />
                </div>
                <div>
                    <label className={styles.label}>닉네임</label>
                    <br />
                    <input
                        type="text"
                        name="nickname"
                        value={userInfo.nickname}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </div>
                <div>
                    <label className={styles.label}>새 비밀번호</label>
                    <br />
                    <input
                        type="password"
                        name="new"
                        value={password.new}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </div>
                <div>
                    <label className={styles.label}>새 비밀번호 확인</label>
                    <br />
                    <input
                        type="password"
                        name="confirm"
                        value={password.confirm}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </div>
                <div>
                    <label className={styles.label}>주소</label>
                    <br />
                    <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        readOnly
                        className={styles.input}
                    />
                    <br />
                    <button type="button" onClick={() => setIsPopupOpen(true)} className={styles.addressButton}>주소 선택</button>
                </div>
                <div>
                    <label className={styles.label}>상세 주소</label>
                    <br />
                    <input
                        type="text"
                        name="addressDetail"
                        value={userInfo.addressDetail}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                </div>
                {errors.general && <p className={styles.error}>{errors.general}</p>}
                {errors.password && <p className={styles.error}>{errors.password}</p>}
                <button type="submit" className={styles.button}>정보 수정</button>
            </form>

            {isPopupOpen && <AddressPopup onAddressSelect={handleAddressSelect} />}
        </div>
    );
};

export default MyPage;
