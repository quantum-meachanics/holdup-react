import React from 'react';

const EmailDomainSelector = ({ selectedDomain, onDomainChange, onEmailChange, handleEmailCheck, emailAvailable }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="이메일"
                onChange={onEmailChange}
                required
            />
            <select value={selectedDomain} onChange={onDomainChange}>
                <option value=""></option>
                <option value="@gmail.com">@gmail.com</option>
                <option value="@naver.com">@naver.com</option>
                <option value="@daum.net">@daum.net</option>
            </select>
            <button type="button" onClick={handleEmailCheck}>이메일 중복 확인</button>
            {emailAvailable !== null && (
                <span>
                    {emailAvailable ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.'}
                </span>
            )}
        </div>
    );
};

export default EmailDomainSelector;
