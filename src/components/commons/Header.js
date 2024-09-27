import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // useSelector 추가
import { resetLoginUser } from "../../modules/UserModule"; // resetLoginUser 액션 임포트
import style from "../../css/Header.module.css";

function Header() {

    const dispatch = useDispatch(); // dispatch 훅 사용
    const isLogin = useSelector(state => state.userReducer.isLogin); // Redux에서 로그인 상태 가져오기

    // 로그아웃 처리
    const logoutHandler = () => {
        sessionStorage.removeItem("isLogin");
        sessionStorage.removeItem("user");
        dispatch(resetLoginUser()); // 상태 초기화
        window.location.reload(); // 페이지 새로 고침
    };

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
                {isLogin ? ( // Redux에서 가져온 isLogin 상태 사용
                    <>
                        <NavLink className={style.memberLink} to="/holdup/mypage">마이페이지</NavLink>
                        <span>|</span>
                        <NavLink className={style.memberLink} to="/holdup/chat">내 채팅</NavLink>
                        <span>|</span>
                        <span onClick={logoutHandler} className={style.logout}>로그아웃</span>
                    </>
                ) : (
                    <>
                        <NavLink className={style.memberLink} to="/holdup/login">로그인</NavLink>
                        <span>|</span>
                        <NavLink className={style.memberLink} to="/holdup/signup">회원가입</NavLink>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header;