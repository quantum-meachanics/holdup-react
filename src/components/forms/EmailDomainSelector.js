import React from 'react';

const EmailDomainSelector = ({ selectedDomain, onDomainChange, onEmailChange }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="이메일"
                onChange={onEmailChange}
                required
            />
            <select value={selectedDomain} onChange={onDomainChange}>
                <option value="@gmail.com">@gmail.com</option>
                <option value="@naver.com">@naver.com</option>
                <option value="@daum.net">@daum.net</option>
            </select>
        </div>
    );
};

export default EmailDomainSelector;
