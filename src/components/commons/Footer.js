import { NavLink } from "react-router-dom";
import style from "../../css/Footer.module.css";

function Footer() {
    return (
        <footer>
            <div className={style.infoSection}>
                <span className={style.logoText}>HoldUP</span>

                <div className={style.linkSection}>
                    <NavLink to="/holdup/reports/create" className={style.link}>신고하기</NavLink>
                    <span className={style.link}>개인정보 처리방침</span>
                    <span className={style.link}>이용 약관</span>
                </div>

                <div className={style.bossInfo}>
                    <span className={style.info}>대표명 : 김대표 / 전화번호 : 010-0000-0000</span>
                </div>

                <div className={style.companyInfo}>
                    <span className={style.info}>회사명 : (주)홀드업</span>
                    <span className={style.info}>|</span>
                    <span className={style.info}>사업자번호 : 100-00-0000</span>
                    <span className={style.info}>|</span>
                    <span className={style.info}>통신판매신고번호 : 2024-서울강남-0000</span>
                    <span className={style.info}>|</span>
                    <span className={style.info}>주소 : 서울시 강남구 홀드업로 1, 홀드업빌딩</span>
                </div>
            </div>

            <div className={style.logoSection}>
                <img src={`${process.env.PUBLIC_URL}/images/holdup_cart.png`} width="100px" height="100px" alt="holdUP_cart"/>
                <span className={style.copyright}>Copyright 2024.Signgtech.All rights.reserved.</span>
            </div>
        </footer>
    );
}

export default Footer;