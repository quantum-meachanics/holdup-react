import React, { useEffect, useState } from 'react';
import styles from '../../css/TermsPopup.module.css'; // CSS 모듈 임포트

const TermsPopup = ({ onClose }) => {
    const [termsContent, setTermsContent] = useState([]);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const response = await fetch('/data/terms.json');
                const data = await response.json();
                setTermsContent(data);
            } catch (error) {
                console.error('이용약관을 불러오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchTerms();
    }, []);

    return (
        <div className={styles.termsPopup}>
            <div className={styles.termsContent}>
                <h2>이용약관</h2>
                {termsContent.map((item, index) => (
                    <div key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                        <p>{item.text2}</p>
                    </div>
                ))}
                <br />
                <button className={styles.button} onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default TermsPopup;
