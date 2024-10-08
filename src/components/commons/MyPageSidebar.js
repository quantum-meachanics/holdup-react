import { NavLink } from "react-router-dom";
import style from "../../css/MypageSidebar.module.css";

function CommunitySidebar() {

    const user = sessionStorage.getItem("user"); 
    const userInfo = JSON.parse(user); 
    
    return (
        <>

            <div className={style.mypageSidebar}>
                <div className={style.infoBox} >
                    <p >닉네임 : {userInfo.nickname}</p>
                    <p >역할 : {userInfo.role}</p>
                    <p >크레딧 : {userInfo.credit}</p>
                </div>
                <div className={style.linkBox}>
                    <NavLink to="/holdup/mypage" className={style.link}><p>내 정보</p></NavLink>
                    <NavLink to="/holdup/mypage" className={style.link}><p>내 공간</p></NavLink>
                    <NavLink to="/holdup/mypage/reservations" className={style.link}><p>내 예약</p></NavLink>
                    <NavLink to="/holdup/mypage" className={style.link}><p>내 리뷰</p></NavLink>
                    <NavLink to="/holdup/mypage" className={style.link}><p>내 문의</p></NavLink>
                    <NavLink to="/holdup/mypage" className={style.link}><p>접수한 신고</p></NavLink>
                </div>
            </div>
        </>
    );
}

export default CommunitySidebar;