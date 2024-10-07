import { useState, useEffect } from 'react';

function AdministratorForm() {
    const [adminData, setAdminData] = useState({
        name: '',
        role: '',
        email: ''
    });

    // 예시로 관리자 데이터를 불러오는 부분 (실제 API 연결 대신 useEffect로 초기값 설정)
    useEffect(() => {
        // 초기 관리자 데이터 설정
        setAdminData({
            name: '홍길동',
            role: 'Super Admin',
            email: 'admin@example.com'
        });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminData({
            ...adminData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 제출 로직 (데이터 전송 등)
        console.log('관리자 정보 제출됨:', adminData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>이름:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={adminData.name} 
                    onChange={handleInputChange} 
                />
            </div>
            <div>
                <label>관리자 권한:</label>
                <input 
                    type="text" 
                    name="role" 
                    value={adminData.role} 
                    onChange={handleInputChange} 
                />
            </div>
            <div>
                <label>이메일:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={adminData.email} 
                    onChange={handleInputChange} 
                />
            </div>
            <button type="submit">정보 저장</button>
        </form>
    );
}

export default AdministratorForm;
