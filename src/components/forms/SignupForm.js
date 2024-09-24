import React, { useState } from 'react';
import { request } from '../../apis/Api'; 
import AddressPopup from './AddressPopup';
import TermsPopup from './TermsPopup'; 
import { useNavigate } from 'react-router-dom';
import styles from '../../css/SignupForm.module.css'; 

const SignupForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        phone: '',
        name: '',
        birthday: '',
        address: '',
        addressDetail: '',
    });

    const [selectedDomain, setSelectedDomain] = useState('@gmail.com');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailAvailable, setEmailAvailable] = useState(null);
    const [nicknameAvailable, setNicknameAvailable] = useState(null);
    const [isAgreed, setIsAgreed] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); // 회원가입 성공 여부

    const handleInputChange = (e) => {
        const { name, value: initialValue } = e.target;
        let value = initialValue;

        if (name === 'phone') {
            value = value.replace(/[^0-9]/g, '').slice(0, 11).replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
        } else if (name === 'birthday') {
            value = value.replace(/[^0-9]/g, '').slice(0, 8);
            if (value.length === 8) {
                value = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6)}`;
            }
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleEmailChange = (e) => {
        const localPart = e.target.value;
        setFormData({ ...formData, email: localPart + selectedDomain });
    };

    const handleDomainChange = (e) => {
        const newDomain = e.target.value;
        setSelectedDomain(newDomain);
        setFormData((prevData) => ({
            ...prevData,
            email: prevData.email.split('@')[0] + newDomain,
        }));
    };

    const handleEmailCheck = async () => {
        try {
            const { available } = await request('GET', `/check-email?email=${formData.email}`);
            setEmailAvailable(available);
            alert(available ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.');
        } catch (error) {
            console.error('이메일 중복 확인 오류:', error);
        }
    };

    const handleNicknameCheck = async () => {
        try {
            const { available } = await request('GET', `/check-nickname?nickname=${formData.nickname}`);
            setNicknameAvailable(available);
            alert(available ? '사용 가능한 닉네임입니다.' : '이미 사용 중인 닉네임입니다.');
        } catch (error) {
            console.error('닉네임 중복 확인 오류:', error);
        }
    };

    const handleAddressSelect = (selectedAddress) => {
        setFormData({
            ...formData,
            address: selectedAddress.roadFullAddr,
            addressDetail: selectedAddress.addressDetail
        });
        setIsPopupOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const finalAddress = `${formData.address} ${formData.addressDetail}`.trim();

        try {
            await request('POST', '/signup', {
                ...formData,
                address: finalAddress,
            });
            alert('회원가입 성공!');
            setIsSuccess(true); // 회원가입 성공 상태 업데이트
        } catch (error) {
            console.error('회원가입 오류:', error);
            setError('회원가입에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleTermsPopupOpen = () => {
        setIsTermsPopupOpen(true);
    };

    const handleTermsPopupClose = () => {
        setIsTermsPopupOpen(false);
    };

    const handleCheckboxChange = () => {
        setIsAgreed(!isAgreed);
    };

    const isFormValid = emailAvailable && nicknameAvailable && formData.password && formData.password === formData.confirmPassword && isAgreed;

    return (
        <div className={styles.container}>
            {isSuccess ? (
                <div className={styles.successMessage}>
                    <h2>회원가입이 완료되었습니다!</h2>
                    
                    <div>
                    <div className={styles.image_container}> <img src={`${process.env.PUBLIC_URL}/images/holdup_box.png`} alt=""/></div>
                        <button onClick={() => navigate('/holdup/login')}>로그인 페이지로 이동</button>
                        <button onClick={() => navigate('/')}>메인 페이지로 이동</button>
                    </div>
                    
                </div>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>이메일</label>
                        {emailAvailable === false && <div className={styles.error}>이미 사용 중인 이메일입니다.</div>}
                        {emailAvailable === true && <div className={styles.success}>사용 가능한 이메일입니다.</div>}
                        <div className={styles.emailInput}>
                            <input
                                type="text"
                                value={formData.email.split('@')[0]}
                                onChange={handleEmailChange}
                                placeholder="이메일"
                                required
                            />
                            <select value={selectedDomain} onChange={handleDomainChange}>
                                <option value="@gmail.com">@gmail.com</option>
                                <option value="@naver.com">@naver.com</option>
                                <option value="@daum.net">@daum.net</option>
                                <option value="@yahoo.com">@yahoo.com</option>
                            </select>
                            <button type="button" onClick={handleEmailCheck}>이메일 확인</button>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>닉네임</label>
                        {nicknameAvailable === false && <div className={styles.error}>이미 사용 중인 닉네임입니다.</div>}
                        {nicknameAvailable === true && <div className={styles.success}>사용 가능한 닉네임입니다.</div>}
                        <div className={styles.nicknameInput}>
                            <input
                                name="nickname"
                                value={formData.nickname}
                                placeholder="닉네임"
                                onChange={handleInputChange}
                                required
                            />
                            <button type="button" onClick={handleNicknameCheck}>닉네임 확인</button>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>비밀번호</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="비밀번호"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>비밀번호 확인</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="비밀번호 확인"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>전화번호</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            placeholder="휴대폰 번호"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>이름</label>
                        <input
                            name="name"
                            placeholder="이름"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>생년월일 (YYYY-MM-DD)</label>
                        <input
                            name="birthday"
                            placeholder="생년월일"
                            value={formData.birthday}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>주소</label>
                        <input
                            name="address"
                            placeholder="주소"
                            value={formData.address}
                            readOnly
                            required
                        />
                        <button type="button" onClick={() => setIsPopupOpen(true)}>주소 검색</button>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>상세주소</label>
                        <input
                            name="addressDetail"
                            placeholder="상세주소"
                            value={formData.addressDetail}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={handleCheckboxChange}
                            />
                            이용약관에 동의합니다.
                        </label>
                        <button type="button" onClick={handleTermsPopupOpen}>이용약관 보기</button>
                    </div>

                    {error && <div className={styles.error}>{error}</div>}
                    <button type="submit" disabled={!isFormValid || loading}>
                        {loading ? '회원가입 진행 중...' : '회원가입'}
                    </button>

                    {isPopupOpen && (
                        <AddressPopup 
                            onClose={() => setIsPopupOpen(false)} 
                            onAddressSelect={handleAddressSelect} 
                        />
                    )}
                    {isTermsPopupOpen && <TermsPopup onClose={handleTermsPopupClose} />}
                </form>
            )}
        </div>
    );
};

export default SignupForm;
