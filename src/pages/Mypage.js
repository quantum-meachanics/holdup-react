import React, { useState } from 'react';
import MypageForm from "../components/forms/MypageForm";
import CreditPage from "../components/forms/CreditPage";

function Mypage() {
    const [activeComponent, setActiveComponent] = useState('mypageForm');

    const handleComponentChange = (component) => {
        setActiveComponent(component);
    };

    return (
        <div>
            <h1>MY HOME</h1>
            <div>
                {/* 버튼을 통해 컴포넌트를 전환 */}
                <button onClick={() => handleComponentChange('mypageForm')}>마이페이지 폼</button>
                <button onClick={() => handleComponentChange('creditPage')}>크레딧 충전</button>
            </div>
            <div>
                {/* 현재 activeComponent에 따라 다른 컴포넌트를 렌더링 */}
                {activeComponent === 'mypageForm' && <MypageForm />}
                {activeComponent === 'creditPage' && <CreditPage />}
            </div>
        </div>
    );
}

export default Mypage;