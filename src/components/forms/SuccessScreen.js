import React, { useEffect } from 'react';
import styles from '../../css/SuccessScreen.module.css'

const SuccessScreen = ({ navigate }) => {
    const handleLoginRedirect = () => {
        if (typeof navigate === 'function') {
            navigate('/holdup/login');
        } else {
            console.error('navigate is not a function');
        }
    };

    // 5초 후 자동으로 리디렉션
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof navigate === 'function') {
                navigate('/holdup/login');
            }
        }, 5000000000000000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles.successContainer}>
            <h1>회원가입 성공!</h1>
            <img src={`${process.env.PUBLIC_URL}/images/holdup_box.png`} alt="회원가입 성공 이미지" />
            <p>회원가입이 완료되었습니다. 5초 후에 로그인 페이지로 이동합니다.</p>
            <button onClick={handleLoginRedirect}>바로 로그인하기</button>
        </div>
    );
};

export default SuccessScreen;
