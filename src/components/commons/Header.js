import { NavLink } from "react-router-dom";
import "../../css/Header.css"

function Header() {
    return (
        <header>
            <NavLink to="/">
                <div className="logoSection">
                    <div className="logoImage">
                        <img src={`${process.env.PUBLIC_URL}/images/holdup_box.png`} width="80px" height="80px" />
                    </div>
                    <div className="logoText">HoldUP</div>
                </div>
            </NavLink>

            <div className="menuSection">
                
                <div className="GuidelineLink">
                    <NavLink to="holdup/guideline">가이드라인</NavLink>
                </div>

                <div className="SpcaeCreateLink">
                    <NavLink to="holdup/spaces">공간등록</NavLink>
                </div>

                <div className="SpcaeUseLink">
                    공간이용
                </div>

                <div className="CommunityLink">
                    <NavLink to="holdup/reviews">커뮤니티</NavLink>
                </div>

                <div className="LoginLink">
                <NavLink to="holdup/login">로그인</NavLink>
                </div>
            </div>

            <div className="memberSection"></div>
        </header>
    )
}

export default Header;