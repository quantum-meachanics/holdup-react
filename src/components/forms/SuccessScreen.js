import React from 'react';
// import styles from '../../css/SuccessScreen.module.css';

const SuccessScreen = ({ navigate }) => {
    const handleLoginRedirect = () => {
        navigate('/login'); // 로그인 페이지로 리디렉션
    };

    return (
        // <div className={styles.successContainer}>
        <div>
            <h1>회원가입 성공!</h1>
            <p>회원가입이 완료되었습니다. 로그인하여 서비스를 이용하세요.</p>
            <button onClick={handleLoginRedirect}>로그인</button>
        </div>
    );
};

export default SuccessScreen;
