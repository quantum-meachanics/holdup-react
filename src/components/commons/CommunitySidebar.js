import { NavLink } from "react-router-dom";

function CommunitySidebar() {
    return (
        <>
        <div className="MemberInfoSection"></div>
        <div className="LinkSection">
            <div>가이드라인</div>
            <div>공지사항</div>
            <div>공간 게시판</div>
            <div>리뷰 게시판</div>
            <div>문의 게시판</div>
        </div>
        </>
    );
}

export default CommunitySidebar;