import { NavLink } from "react-router-dom";
import style from "../../css/MypageSidebar.module.css";

function CommunitySidebar() {
    return (
        <div className={style.mypageSidebar}>
            <NavLink to="/holdup/mypage" className={style.link}>내 정보</NavLink>
            <NavLink to="/holdup/mypage" className={style.link}>내 공간</NavLink>
            <NavLink to="/holdup/mypage/reservations" className={style.link}>내 예약</NavLink>
            <NavLink to="/holdup/mypage" className={style.link}>내 리뷰</NavLink>
            <NavLink to="/holdup/mypage" className={style.link}>내 문의</NavLink>
            <NavLink to="/holdup/mypage" className={style.link}>접수한 신고</NavLink>
        </div>
    );
}

export default CommunitySidebar;