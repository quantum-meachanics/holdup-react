import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo, fetchUserInfo } from '../../apis/MypageAPICall';
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
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [errors, setErrors] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // 비밀번호 가시성 상태 관리
    const[showPassword,setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const fetchAndSetUserInfo = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");

                if (token && storedUser?.email) {
                    const userData = await fetchUserInfo(token, storedUser.email);

                    setUserInfo(prevInfo => ({
                        ...prevInfo,
                        ...userData,
                        address: userData.address || '',
                        addressDetail: userData.addressDetail || '',
                    }));

                    sessionStorage.setItem("user", JSON.stringify({
                        ...storedUser,
                        ...userData,
                    }));

                } else {
                    navigate('/holdup/login');
                }
            } catch (error) {
                console.error("회원 정보 가져오기 실패:", error);
                setErrors({ general: "회원 정보를 가져오는 중 오류가 발생했습니다." });
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
            if (name === 'new') {
                setPasswordStrength(getPasswordStrength(value));
            }
            if (name === 'confirm') {
                setPasswordMatch(value === password.new);
            }
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

    const getPasswordStrength = (password) => {
        if (password.length < 6) return '너무 짧습니다.';
        if (!/[A-Z]/.test(password)) return '대문자를 포함해야 합니다.';
        if (!/[a-z]/.test(password)) return '소문자를 포함해야 합니다.';
        if (!/[0-9]/.test(password)) return '숫자를 포함해야 합니다.';
        if (!/[!@#$%^&*]/.test(password)) return '특수 문자를 포함해야 합니다.';
        return '강함';
    };

    const handleUpdateUserInfo = async () => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                setErrors({ general: "인증 정보가 없습니다. 다시 로그인 해주세요." });
                return;
            }

            if (password.new && password.new !== password.confirm) {
                setErrors({ password: "새 비밀번호와 비밀번호 확인이 일치하지 않습니다." });
                return;
            }

            const response = await updateUserInfo(token, {
                email: userInfo.email,
                currentPassword: password.current,
                nickname: userInfo.nickname,
                newPassword: password.new || undefined,
                address: userInfo.address,
                addressDetail: userInfo.addressDetail,
            });

            if (response && response.success) {
                alert(response.message);

                const updatedUserInfo = {
                    ...userInfo,
                    address: userInfo.address,
                    addressDetail: userInfo.addressDetail,
                };

                setUserInfo(updatedUserInfo);
                sessionStorage.setItem("user", JSON.stringify(updatedUserInfo));

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
                         type={showPassword ? "text" : "password"}  // 비밀번호 가시성 토글
                        name="current"
                        value={password.current}
                        onChange={handleInputChange}
                        required
                        className={styles.inputPassword}
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowPassword(prev => !prev)}  // 토글 버튼
                        className={styles.showPasswordButton}
                    >
                        {showPassword ? "숨기기" : "보기"}
                    </button>
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
                        type={showNewPassword ? "text" : "password"}  // 비밀번호 가시성 토글
                        name="new"
                        value={password.new}
                        onChange={handleInputChange}
                        className={styles.inputPassword}
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowNewPassword(prev => !prev)}  // 토글 버튼
                        className={styles.showPasswordButton}
                    >
                        {showNewPassword ? "숨기기" : "보기"}
                    </button>
                    <p className={styles.passwordStrength}>
                        비밀번호 강도: <strong>{passwordStrength}</strong>
                    </p>
                </div>
                <div>
                    <label className={styles.label}>새 비밀번호 확인</label>
                    <br />
                    <input
                        type={showConfirmPassword ? "text" : "password"}  // 비밀번호 확인 가시성 토글
                        name="confirm"
                        value={password.confirm}
                        onChange={handleInputChange}
                        className={styles.inputPassword}
                    />
                    <button 
                        type="button" 
                        onClick={() => setShowConfirmPassword(prev => !prev)}  // 토글 버튼
                        className={styles.showPasswordButton}
                    >
                        {showConfirmPassword ? "숨기기" : "보기"}
                    </button>
                    {!passwordMatch && (
                        <p className={styles.error}>비밀번호가 일치하지 않습니다.</p>
                    )}
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
