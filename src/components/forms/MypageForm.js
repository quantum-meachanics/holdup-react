import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logoutUser } from '../../modules/UserModule';
import { updateUserInfo } from '../../apis/MypageAPICall';
import AddressPopup from './AddressPopup';
import styles from '../../css/MyPageForm.module.css'; // CSS 모듈 import

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
    const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user") || "null");
        if (user) {
            setUserInfo(prevInfo => ({
                ...prevInfo,
                ...user,
                address: user.address || '',
                addressDetail: user.addressDetail || '',
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

    const handleAddressSelect = (selectedAddress) => {
        if (selectedAddress) {
            setUserInfo(prev => ({
                ...prev,
                address: selectedAddress.roadFullAddr,
                addressDetail: '',
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

            // address와 addressDetail을 별도로 보내도록 설정
            const response = await updateUserInfo(token, {
                email: userInfo.email,
                currentPassword: password.current,
                nickname: userInfo.nickname,
                newPassword: password.new || undefined,
                address: userInfo.address, // address 전송
                addressDetail: userInfo.addressDetail, // addressDetail 전송
            });

            if (response.success) {
                alert(response.message);
                // 세션 스토리지의 사용자 정보 업데이트
                sessionStorage.setItem("user", JSON.stringify({
                    ...userInfo,
                    address: userInfo.address,
                    addressDetail: userInfo.addressDetail,
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
        <div className={styles.mypageContainer}>
            <div>
            <h1 className={styles.heading}>마이 페이지</h1>
            <h2 className={styles.subheading}>환영합니다, {userInfo.nickname}님!</h2>
            <p className={styles.infoText}>이메일 : {userInfo.email}</p>
            <p className={styles.infoText}>역할 : {userInfo.role}</p>
            <p className={styles.infoText}>크레딧 : {userInfo.credit}</p>
            </div>

            <h3 className={styles.sectionTitle}>회원 정보 수정</h3>
            {/* <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleUpdateUserInfo(); }}> */}
            <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleUpdateUserInfo(); }}>
                <div>
                    <label className={styles.label}> 현재 비밀번호 </label>
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
                    <label className={styles.label}> 닉네임 </label>

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
                    <label className={styles.label}> 새 비밀번호</label>
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
                    <label className={styles.label}> 새 비밀번호 확인 </label>
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
                    <label className={styles.label}> 주소 </label>
                    <br />
                    <input
                        type="text"
                        name="address"
                        value={userInfo.address}
                        readOnly
                        className={styles.input}
                    />
                    <br/>
                    <button type="button" onClick={() => setIsPopupOpen(true)} className={styles.addressButton}>주소 선택</button>
                </div>
                <div>
                    <label className={styles.label}> 상세 주소 </label>

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
                <button onClick={handleLogout} className={`${styles.button} ${styles.logoutButton}`}>로그아웃</button>
            </form>
            
            {isPopupOpen && <AddressPopup onAddressSelect={handleAddressSelect} />}
        </div>
    );
};

export default MyPage;
