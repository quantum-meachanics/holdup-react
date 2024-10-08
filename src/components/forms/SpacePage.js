import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { callAllSpacesAPI } from "../../apis/SpaceAPICalls";
import Pagination from "./Pagination";
import style from "../../css/SpacePage.module.css";

function SpacePage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { spaceList, totalPages, error } = useSelector(state => state.spacePageReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callAllSpacesAPI(currentPage));
    }, [dispatch, currentPage]);

    // 현재 페이지 변경 핸들러
    const pageChangeHandler = (newPage) => {
        setCurrentPage(newPage);
    };

    // 페이지 이동 핸들러
    const pageHandler = (id) => {
        navigate(`/holdup/spaces/${id}`);
    };

    // 날짜 형식 포맷
    const formatDate = (dateArray) => {
        // dateArray가 유효한지 확인
        if (!Array.isArray(dateArray) || dateArray.length < 3) {
            console.error("Invalid date array:", dateArray);
            return "유효하지 않은 날짜";
        }
    
        // Date 객체 생성
        const year = dateArray[0];
        const month = String(dateArray[1]).padStart(2, '0'); // 월을 두 자리로 포맷
        const day = String(dateArray[2]).padStart(2, '0'); // 일을 두 자리로 포맷
    
        // "년-월-일" 형식으로 문자열 생성
        return `${year}-${month}-${day}`;
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>

            <span>등록된 공간들</span>
            <NavLink to="/holdup/createSpace">등록하기</NavLink>

            {spaceList && spaceList.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>대표이미지</th>
                            <th>공간 이름</th>
                            <th>등록자명</th>
                            <th>등록일</th>
                            <th>별점</th>
                            <th>리뷰수</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spaceList.map(space => (
                            <tr key={space.id} onClick={() => pageHandler(space.id)} style={{ cursor: "pointer" }}>
                                <td><img src={space.imageUrl} alt={`${space.id}번 이미지`} width={100} height={70} /></td>
                                <td>{space.name}</td>
                                <td>{space.ownerNickname}</td>
                                <td>{formatDate(space.createDate)}</td>
                                <td>{space.ratingAverage}</td>
                                <td>{space.reviewCount}</td>
                                <td>{space.count > 0 ? (
                                    <div className={style.status}>
                                        <div className={style.greenDot}></div>
                                        <span>예약 가능</span>
                                    </div>
                                ) : (
                                    <div className={style.status}>
                                        <div className={style.redDot}></div>
                                        <span>예약 불가</span>
                                    </div>
                                )}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <span>등록된 공간이 없습니다.</span>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={pageChangeHandler}
            />
        </div>
    );
}

export default SpacePage;