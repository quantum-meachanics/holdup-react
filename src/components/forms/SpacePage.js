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
        <div className={style.main}>

            <div className={style.titleSection}>
                <span className={style.title}>등록된 공간들</span>
                <NavLink to="/holdup/createSpace" className={style.createButton}>등록하기</NavLink>
            </div>

            {spaceList && spaceList.length > 0 ? (
                <table className={style.table}>
                    {spaceList.map(space => (
                        <div className={style.space} key={space.id} onClick={() => pageHandler(space.id)} style={{ cursor: "pointer" }}>

                            <img src={space.imageUrl} alt={`${space.id}번 이미지`} width={100} height={70} />

                            <div className={style.spaceInfo}>
                                <span className={style.spaceName}>{space.name}</span>

                                <div>
                                    <span className={style.ownerNickname}>{space.ownerNickname}</span>
                                    <span className={style.createDate}>{formatDate(space.createDate)}</span>
                                </div>

                                <div>
                                    <span className={style.ratingAverage}>⭐ {space.ratingAverage}</span>
                                    <span className={style.reviewCount}>리뷰수 {space.reviewCount}</span>
                                </div>
                            </div>

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
                            )}
                            </td>

                        </div>
                    ))}
                </table>
            ) : (
                <span className={style.noSpaceText}>등록된 공간이 없습니다.</span>
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