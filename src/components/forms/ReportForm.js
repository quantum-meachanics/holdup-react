import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callGetReportListAPI } from '../../apis/ReportAPICall';
import Pagination from './Pagination';
import style from "../../css/ReportForm.module.css";

function ReportForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reportList, totalPages, error } = useSelector(state => state.reportReducer);
    const [currentPage, setCurrentPage] = useState(1);

    // 컴포넌트가 마운트되거나 currentPage가 변경될 때 리뷰 목록 가져오기
    useEffect(() => {
        console.log('Fetching reviews for page:', currentPage);
        dispatch(callGetReportListAPI(currentPage));
    }, [dispatch, currentPage]);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        console.log('Changing to page:', newPage);
        setCurrentPage(newPage);
    };

    // 상세페이지로 이동
    const handleClick = (id) => {
        navigate(`/holdup/reports/${id}`);
    };

    // 글쓰기 페이지로 이동
    const handleWriteReview = () => {
        navigate('/holdup/reports/create');
    };

    // 에러 발생 시 에러 메시지 표시
    if (error) {
        return <div>에러 발생: {error.message || '알 수 없는 오류'}</div>;
    }

    console.log('Current state:', { reportList, totalPages, error });
    console.log("리뷰 컴포넌트 재랜더링됨");

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
        <div className={style.main}>
            <span className={style.title}>신고 게시판</span>
            <button className={style.button} onClick={handleWriteReview}>글쓰기</button>

            {reportList && reportList.length > 0 ? (
                <div>
                    <table className={style.table}>
                        <thead className={style.thead}>
                            <tr>
                                <th className={style.th}>등록날짜</th>
                                <th className={style.th}>제목</th>
                                <th className={style.th}>닉네임</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportList.map(reportList => (
                                <tr key={reportList.id} onClick={() => handleClick(reportList.id)} className={style.td}>
                                    <td className={style.td}>{formatDateTime(reportList.createDate)}</td>
                                    <td className={style.td}>{reportList.title}</td>
                                    <td className={style.td}>{reportList.nickname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>신고글이 없습니다.</p>
            )}

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>

    );
}

export default ReportForm;