import React, { useState } from 'react';
import { request } from '../../apis/Api'; 
import AddressPopup from './AddressPopup';
import { useNavigate } from 'react-router-dom';
import '../../css/SignupForm.css'; 

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

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [emailAvailable, setEmailAvailable] = useState(null);
    const [nicknameAvailable, setNicknameAvailable] = useState(null);

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
            navigate('/'); // 메인 페이지로 이동
        } catch (error) {
            console.error('회원가입 오류:', error);
            setError('회원가입에 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = emailAvailable && nicknameAvailable && formData.password && formData.password === formData.confirmPassword;

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label>이메일</label>
                {emailAvailable === false && <div className="error">이미 사용 중인 이메일입니다.</div>}
                {emailAvailable === true && <div className="success">사용 가능한 이메일입니다.</div>}
                <div className="email-input">
                    <input
                        name="email"
                        value={formData.email}
                        type="email"
                        onChange={handleInputChange}
                        required
                    />
                    <button type="button" onClick={handleEmailCheck}>이메일 중복 확인</button>
                </div>
            </div>

            <div className="input-group">
                <label>닉네임</label>
                {nicknameAvailable === false && <div className="error">이미 사용 중인 닉네임입니다.</div>}
                {nicknameAvailable === true && <div className="success">사용 가능한 닉네임입니다.</div>}
                <div className="nickname-input">
                    <input
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="button" onClick={handleNicknameCheck}>닉네임 중복 확인</button>
                </div>
            </div>

            <div className="input-group">
                <label>비밀번호</label>
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="input-group">
                <label>비밀번호 확인</label>
                <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="input-group">
                <label>전화번호</label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="input-group">
                <label>이름</label>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="input-group">
                <label>생년월일 (YYYY-MM-DD)</label>
                <input
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="input-group">
                <label>주소</label>
                <input
                    name="address"
                    value={formData.address}
                    readOnly
                    required
                />
                <button type="button" onClick={() => setIsPopupOpen(true)}>주소 검색</button>
            </div>

            <div className="input-group">
                <label>상세주소</label>
                <input
                    name="addressDetail"
                    value={formData.addressDetail}
                    onChange={handleInputChange}
                    required
                />
            </div>

            <div className="input-group">
                <button type="submit" disabled={loading || !isFormValid}>
                    {loading ? '로딩 중...' : '회원가입'}
                </button>
            </div>

            {error && <div className="error">{error}</div>}
            {isPopupOpen && <AddressPopup onAddressSelect={handleAddressSelect} />}
        </form>
    );
};

export default SignupForm;
