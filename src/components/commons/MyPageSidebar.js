import { NavLink } from "react-router-dom";
import style from "../../css/MypageSidebar.module.css"
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
            <div className={style.mypageSidebar}>
                <NavLink to="/holdup/mypage" className={style.link}>내 정보</NavLink>
                <NavLink to="/holdup/mypage" className={style.link}>내 공간</NavLink>
                <NavLink to="/holdup/mypage/reservations" className={style.link}>내 예약</NavLink>
                <NavLink to="/holdup/mypage" className={style.link}>내 리뷰</NavLink>
                <NavLink to="/holdup/mypage" className={style.link}>내 문의</NavLink>
                <NavLink to="/holdup/mypage" className={style.link}>접수한 신고</NavLink>
            </div>


            <div className={style.menuSection}>
                <NavLink to="/holdup/guideline" className={style.menuLink}>가이드라인</NavLink>
                <NavLink to="/" className={style.menuLink}>공지사항</NavLink>
                <NavLink to="/holdup/spaces" className={style.menuLink}>공간 게시판</NavLink>
                <NavLink to="/holdup/reviews" className={style.menuLink}>리뷰 게시판</NavLink>
                <NavLink to="/holdup/inquiries" className={style.menuLink}>문의 게시판</NavLink>
            </div>
        </div>

    );
}

export default CommunitySidebar;