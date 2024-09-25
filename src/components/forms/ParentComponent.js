import React, { useState } from 'react';
import EmailDomainSelector from './EmailDomainSelector';

const ParentComponent = () => {
    const [selectedDomain, setSelectedDomain] = useState('@gmail.com'); // 선택된 도메인 상태
    const [email, setEmail] = useState(''); // 이메일 입력 상태

    // 도메인 변경 핸들러
    const handleDomainChange = (e) => {
        setSelectedDomain(e.target.value);
    };

    // 이메일 변경 핸들러
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div>
            <h2>이메일 입력</h2>
            <EmailDomainSelector
                selectedDomain={selectedDomain}
                onDomainChange={handleDomainChange}
                onEmailChange={handleEmailChange}
            />
            <p>입력한 이메일: {email}{selectedDomain}</p> {/* 입력한 이메일 표시 */}
        </div>
    );
};

export default ParentComponent;