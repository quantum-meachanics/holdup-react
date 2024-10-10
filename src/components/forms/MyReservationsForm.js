import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMyReservationsAPI } from "../../apis/ReservationAPICall";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import style from "../../css/MyReservation.module.css";

function MyReservationsForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { myReservationList, totalPages } = useSelector(state => state.myReservationReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callMyReservationsAPI(currentPage));
        console.log("가져온 예약 리스트", { myReservationList });
    }, [dispatch, currentPage]);

    // 현재 페이지 변경 핸들러
    const pageChangeHandler = (newPage) => {
        setCurrentPage(newPage);
    };

    // 페이지 이동 핸들러
    const spaceNameClickHandler = (spaceId) => {
        navigate(`/holdup/spaces/${spaceId}`);
    };

    const handleWriteReview = (id) => {
        navigate(`/holdup/reviews/create/${id}`);
    };

    // 날짜 형식 포맷
    const formatDateTime = (dateArray) => {
        // dateArray가 유효한지 확인
        if (!Array.isArray(dateArray) || dateArray.length < 5) {
            console.error("Invalid date array:", dateArray);
            return "유효하지 않은 날짜";
        }

        // Date 객체 생성
        const year = dateArray[0];
        const month = String(dateArray[1]).padStart(2, '0'); // 월을 두 자리로 포맷
        const day = String(dateArray[2]).padStart(2, '0'); // 일을 두 자리로 포맷
        const hour = String(dateArray.length > 3 ? dateArray[3] : 0).padStart(2, '0'); // 시를 두 자리로 포맷
        const minute = String(dateArray.length > 4 ? dateArray[4] : 0).padStart(2, '0'); // 분을 두 자리로 포맷
        const second = String(dateArray.length > 5 ? dateArray[5] : 0).padStart(2, '0'); // 초를 두 자리로 포맷

        // "년월일 시:분:초" 형식으로 문자열 생성
        return `${year}년 ${month}월 ${day}일 ${hour}:${minute}:${second}`;
    };

    // 사용기간 형식 포맷
    const formatUseDate = (dateArray) => {
        // dateArray가 유효한지 확인
        if (!Array.isArray(dateArray) || dateArray.length < 5) {
            console.error("Invalid date array:", dateArray);
            return "유효하지 않은 날짜";
        }

        // Date 객체 생성
        const year = dateArray[0];
        const month = String(dateArray[1]).padStart(2, '0'); // 월을 두 자리로 포맷
        const day = String(dateArray[2]).padStart(2, '0'); // 일을 두 자리로 포맷
        const hour = String(dateArray.length > 3 ? dateArray[3] : 0).padStart(2, '0'); // 시를 두 자리로 포맷

        // "년월일 시:분:초" 형식으로 문자열 생성
        return `${year}년 ${month}월 ${day}일 ${hour}시`;
    };

    return (
        <div className={style.main}>
            <span className={style.title}>나의 예약</span>

            {myReservationList && myReservationList.length > 0 ? (
                <table className={style.table}>
                    <thead className={style.thead}>
                        <tr>
                            <th className={style.th}>예약번호</th>
                            <th className={style.th}>상태</th>
                            <th className={style.th}>신청일</th>
                            <th className={style.th}>사용기간</th>
                            <th className={style.th}>공간명</th>
                            <th className={style.th}>리뷰 쓰기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myReservationList.map(myReservation => (
                            <tr key={myReservation.id} className={style.rowHover}>
                                <td className={style.td}>{myReservation.id}</td>
                                <td className={style.td}>{myReservation.accept ? (myReservation.end ? "종료됨" : "이용중") : "대기중"}</td>
                                <td className={style.td}>{formatDateTime(myReservation.createDateTime)}</td>
                                <td className={style.td}>
                                    {formatUseDate(myReservation.startDateTime)} ~ {formatUseDate(myReservation.endDateTime)}
                                </td>
                                <td className={style.td} onClick={() => spaceNameClickHandler(myReservation.spaceId)}>{myReservation.spaceName}</td>
                                <td className={style.td}>
                                    {!myReservation.hasReview && (
                                        <button
                                            className={`${style.button} ${style.buttonHover}`}
                                            onClick={() => handleWriteReview(myReservation.id)}
                                        >
                                            리뷰 쓰기
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <span>신청한 예약이 없습니다.</span>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={pageChangeHandler}
            />
        </div>
    );
}

export default MyReservationsForm;