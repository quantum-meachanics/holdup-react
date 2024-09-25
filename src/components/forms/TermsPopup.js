import React, { useEffect, useState } from 'react';
// import styles from '../../css/TermsPopup.module.css';

const TermsPopup = ({ onClose }) => {
    const [termsContent, setTermsContent] = useState([]);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const response = await fetch('/data/terms.json'); // 이용약관 데이터 파일 호출
                const data = await response.json();
                setTermsContent(data);
            } catch (error) {
                console.error('이용약관을 불러오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchTerms(); // 컴포넌트가 마운트될 때 약관 데이터를 불러옴
    }, []);

    return (
        // <div className={styles.termsPopup}>
        //     <div className={styles.termsContent}>
        <div>
            <div >
                <h2>이용약관</h2>
                {termsContent.map((item, index) => (
                    // <div key={index} className={styles.termItem}>
                    <div key={index}>
                        <h3>{item.title}</h3> {/* 각 약관의 제목 */}
                        <p>{item.text}</p> {/* 각 약관의 본문 */}
                        <p>{item.text2}</p> {/* 약관의 추가 내용 */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TermsPopup;
