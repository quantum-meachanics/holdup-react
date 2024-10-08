import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMyReservationsAPI } from "../../apis/ReservationAPICall";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

function MyReservationsForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { myReservationList, totalPages, error } = useSelector(state => state.myReservationReducer);
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

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <span>나의 예약</span>
                {myReservationList && myReservationList.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>예약번호</th>
                                <th>상태</th>
                                <th>신청일</th>
                                <th>사용기간</th>
                                <th>공간명</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myReservationList.map(myReservation => (
                                <tr key={myReservation.id}>
                                    {/* 예약 아이디 */}
                                    <td>{myReservation.id}</td>

                                    {/* 예약 상태 */}
                                    <td>
                                        {myReservation.accept ? (myReservation.end ? "종료됨" : "이용중") : "대기중"}
                                    </td>

                                    {/* 예약 신청일시 */}
                                    <td>{formatDateTime(myReservation.createDateTime)}</td>

                                    {/* 신청한 사용 기간 */}
                                    <td>
                                        {formatDateTime(myReservation.startDateTime)}부터
                                        {formatDateTime(myReservation.endDateTime)}까지
                                    </td>

                                    {/* 공간이름(클릭시 해당 공간 상세페이지로 이동) */}
                                    <td onClick={() => spaceNameClickHandler(myReservation.spaceId)}>{myReservation.spaceName}</td>

                                    {!myReservation.hasReview && (
                                        <button onClick={() => handleWriteReview(myReservation.id)}>
                                            리뷰 쓰기
                                        </button>
                                    )}

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
        </>
    );
}

export default MyReservationsForm;