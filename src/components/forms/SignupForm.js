import React, { useState } from 'react';
import { request } from '../../apis/Api'; // API 요청 함수 import
import AddressPopup from './AddressPopup';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nickname: '',
        phone: '',
        name: '',
        birthday: '',
        address: ''
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddressSelect = (address) => {
        setFormData({ ...formData, address: address.roadFullAddr });
        setIsPopupOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset error message

        try {
            const response = await request('POST', '/signup', formData);
            console.log(response);
            alert('회원가입 성공!');
        } catch (error) {
            console.error('회원가입 오류:', error);
            setError('회원가입에 실패했습니다.'); // Show error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="이메일" onChange={handleInputChange} required />
            <input name="password" type="password" placeholder="비밀번호" onChange={handleInputChange} required />
            <input name="nickname" placeholder="닉네임" onChange={handleInputChange} required />
            <input name="phone" placeholder="전화번호" onChange={handleInputChange} required />
            <input name="name" placeholder="이름" onChange={handleInputChange} required />
            <input name="birthday" placeholder="생일" onChange={handleInputChange} required />
            <input name="address" value={formData.address} placeholder="주소" readOnly />
            <button type="button" onClick={() => setIsPopupOpen(true)}>주소 검색</button>
            <button type="submit" disabled={loading}>{loading ? '로딩 중...' : '회원가입'}</button>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* 에러 메시지 출력 */}
            {isPopupOpen && <AddressPopup onAddressSelect={handleAddressSelect} />} 
        </form>
    );
};

export default SignupForm;
