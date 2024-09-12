import { NavLink } from "react-router-dom";
import "../../css/Footer.css";

function Footer() {
    return (
        <footer>
            <div className="FooterLogoText">HoldUP</div>

            <div className="FooterLinkSection">
                <div className="ReportLink">신고하기</div>
                <div className="PrivacyPolicyLink">개인정보 처리방침</div>
                <div className="TermsOfUseLink">이용 약관</div>
            </div>

            <div className="CeoPhone">대표 전화번호 : 010-0000-0000</div>

            <div className="companyInfo">회사명 : (주)홀드업 | 대표명 : 김대표 | 사업자번호 : 100-00-0000 | 통신판매신고번호 : 2024-서울강남-0000 | 주소 : 서울시 강남구 홀드업로 1, 홀드업빌딩</div>

            <div className="FooterLogoImage"></div>

            <div className="copyright">Copyright 2024.Signgtech.All rights.reserved.</div>
        </footer>
    );
}

export default Footer;