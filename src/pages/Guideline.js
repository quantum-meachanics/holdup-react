import styles from '../css/Guideline.module.css'

function Guideline() {
    return (
        <>
            <h1>짐 사이즈 가이드라인</h1>
            <p className={styles.guideTitle}>HoldUP은 다양한 사이즈의 스토리지를 제공합니다</p>
            <div className={styles.guideContainer}>
                
                <div className={styles.card}>
                    <img src={`${process.env.PUBLIC_URL}/images/carrier_icon.png`} alt="작은 짐" className={styles.guideImage} />
                    <p className={styles.guideTitleText}>작은 사이즈</p>
                    <p className={styles.guideText}>최대 10kg, 50x50x30cm</p>
                    <p>소형 배낭, 노트북 가방</p>
                    <p>작은 상자, 신발 상자</p>
                </div>
                
                <div className={styles.card}>
                    <img src={`${process.env.PUBLIC_URL}/images/carrier_icon.png`} alt="중간 짐" className={styles.guideImage} />
                    <p className={styles.guideTitleText}>중간 사이즈</p>
                    <p className={styles.guideText}>최대 20kg, 70x50x40cm</p>
                    <p>기내용 캐리어, 여행 가방</p>
                    <p>중형 상자, 골프 가방</p>
                </div>
                
                <div className={styles.card}>
                    <img src={`${process.env.PUBLIC_URL}/images/carrier_icon.png`} alt="큰 짐" className={styles.guideImage} />
                    <p className={styles.guideTitleText}>큰 사이즈</p>
                    <p className={styles.guideText}>최대 30kg, 100x70x50cm</p>
                    <p>대형 캐리어, 이삿짐 상자</p>
                    <p>캠핑 장비, 자전거 박스</p>
                </div>
                
                <div className={styles.card}>
                    <img src={`${process.env.PUBLIC_URL}/images/carrier_icon.png`} alt="특대형 짐" className={styles.guideImage} />
                    <p className={styles.guideTitleText}>특대형 사이즈</p>
                    <p className={styles.guideText}>최대 50kg, 150x100x70cm</p>
                    <p>가구, TV 박스</p>
                    <p>대형 가전제품, 스키/스노우보드</p>
                </div>
    
            </div>
        </>
    );    
}

export default Guideline;