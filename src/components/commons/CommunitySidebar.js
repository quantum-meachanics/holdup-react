import { NavLink } from "react-router-dom";
import style from "../../css/CommunitySidebar.module.css"
import { useDispatch, useSelector } from "react-redux";
import { resetLoginUser } from "../../modules/UserModule";

function CommunitySidebar() {

    const dispatch = useDispatch(); // dispatch 훅 사용
    const isLogin = useSelector(state => state.userReducer.isLogin); // Redux에서 로그인 상태 가져오기

    const user = sessionStorage.getItem("user"); // 세션 스토리지에 저장된 user 가져오기
    const userInfo = JSON.parse(user); // JSON 상태인 user를 객체로 변환

    // 로그아웃 처리
    const logoutHandler = () => {
        sessionStorage.removeItem("isLogin");
        sessionStorage.removeItem("user");
        dispatch(resetLoginUser()); // 상태 초기화
    };

    return (
        <div className={style.communitySidebar}>
            <div className={style.userSection}>
                {isLogin ? (
                    <>
                        <div className={style.userInfo}>
                            {/* <span className={style.nickname}>열두글자까지가능한닉네임</span> */}
                            <span className={style.nickname}>{userInfo.nickname}</span>
                            <div className={style.creditSection}>
                                <span className={style.creditLabel}>크레딧 : </span>
                                <span className={style.credit}>1234567890</span>
                                <NavLink to="/" className={style.creditButton}>+</NavLink>
                            </div>
                        </div>
                        <NavLink to="/holdup/mypage" className={style.userButton}>마이페이지</NavLink>
                        <NavLink to="/" className={style.userButton}>내 채팅</NavLink>
                        <span onClick={logoutHandler} className={style.userButton}>로그아웃</span>
                    </>
                ) : (
                    <NavLink to="/holdup/login" className={style.loginButton}>로그인하기</NavLink>
                )}
            </div>

            <div className={style.menuSection}>
                <NavLink to="/holdup/guideline" className={style.menuLink}>가이드라인</NavLink>
                <NavLink to="/" className={style.menuLink}>공지사항</NavLink>
                <NavLink to="/holdup/spaces" className={style.menuLink}>공간 게시판</NavLink>
                <NavLink to="/holdup/reviews" className={style.menuLink}>리뷰 게시판</NavLink>
                <NavLink to="/holdup/inquiries" className={style.menuLink}>문의 게시판</NavLink>
                <NavLink to="/holdup/reports" className={style.menuLink}>신고 게시판</NavLink>
            </div>
        </div>
    );
}

export default CommunitySidebar;