import { NavLink } from "react-router-dom";
import style from "../../css/Header.module.css";

function Header() {
    return (
        <header>
            <NavLink to="/" className={style.logoSection}>
                <img src={`${process.env.PUBLIC_URL}/images/holdup_box.png`} width="80px" height="80px" alt="" className={style.logoImage} />
                <span>HoldUP</span>
            </NavLink>

            <div className={style.menuSection}>
                <NavLink className={style.menuLink} to="holdup/guideline">가이드라인</NavLink>
                <NavLink className={style.menuLink} to="holdup/spaces">공간등록</NavLink>
                <NavLink className={style.menuLink} to="/">공간이용</NavLink>
                <NavLink className={style.menuLink} to="holdup/reviews">커뮤니티</NavLink>
                
                
            </div>

            <div className={style.memberSection}>
                <NavLink className={style.memberLink} to="holdup/login">로그인</NavLink>
                <span>|</span>
                <NavLink className={style.memberLink} to="holdup/signup">회원가입</NavLink>
                <span>|</span>
                <NavLink className={style.memberLink} to="holdup/mypage">마이페이지</NavLink>
            </div>
        </header>
    )
}

export default Header;