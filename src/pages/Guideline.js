import styles from '../css/Guideline.module.css'

function Guideline() {
    return (
        <div className={styles.main}>
            <span className={styles.title}>공간 크기 가이드라인</span>

            <span className={styles.subTitle}>홀드업에서 제공하는 기준에 맞춰 공간 사이즈가 지정됩니다</span>

            <div className={styles.cardSection}>
                <div className={styles.card}>
                    <img src={`${process.env.PUBLIC_URL}/images/carrier_icon.png`} alt="작은 짐" className={styles.guideImage} />
                    <span className={styles.sizeText}>소형</span>
                    <span className={styles.sizeSubText}>최대 10kg, 50x50x30cm</span>
                    <span className={styles.exampleText}>- 보관 가능한 짐 예시 -</span>
                    <span className={styles.description}>소형 배낭, 노트북 가방</span>
                    <span className={styles.description}>작은 상자, 신발 상자</span>
                </div>

                <div className={styles.card}>
                    <img src={`${process.env.PUBLIC_URL}/images/carrier_icon.png`} alt="중간 짐" className={styles.guideImage} />
                    <span className={styles.sizeText}>중형</span>
                    <span className={styles.sizeSubText}>최대 20kg, 70x50x40cm</span>
                    <span className={styles.description}>- 보관 가능한 짐 예시 -</span>
                    <span className={styles.description}>기내용 캐리어, 여행 가방</span>
                    <span className={styles.description}>중형 상자, 골프 가방</span>
                </div>

                <div className={styles.card}>
                    <img src={`${process.env.PUBLIC_URL}/images/carrier_icon.png`} alt="큰 짐" className={styles.guideImage} />
                    <span className={styles.sizeText}>대형</span>
                    <span className={styles.sizeSubText}>최대 30kg, 100x70x50cm</span>
                    <span className={styles.description}>- 보관 가능한 짐 예시 -</span>
                    <span className={styles.description}>대형 캐리어, 이삿짐 상자</span>
                    <span className={styles.description}>캠핑 장비, 자전거 박스</span>
                </div>

                <div className={styles.card}>
                    <img src={`${process.env.PUBLIC_URL}/images/carrier_icon.png`} alt="특대형 짐" className={styles.guideImage} />
                    <span className={styles.sizeText}>특대형</span>
                    <span className={styles.sizeSubText}>최대 50kg, 150x100x70cm</span>
                    <span className={styles.description}>- 보관 가능한 짐 예시 -</span>
                    <span className={styles.description}>가구, TV 박스</span>
                    <span className={styles.description}>대형 가전제품, 스키/스노우보드</span>
                </div>
            </div>
        </div>
    );
}

export default Guideline;