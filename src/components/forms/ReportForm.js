import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callGetReviewListAPI } from '../../apis/ReviewAPICall';
import Pagination from './Pagination';

function ReportForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reportList, totalPages, error } = useSelector(state => state.reportReducer);
    const [currentPage, setCurrentPage] = useState(1);

    // 컴포넌트가 마운트되거나 currentPage가 변경될 때 리뷰 목록 가져오기
    useEffect(() => {
        console.log('Fetching reviews for page:', currentPage);
        dispatch(callGetReviewListAPI(currentPage));
    }, [dispatch, currentPage]);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        console.log('Changing to page:', newPage);
        setCurrentPage(newPage);
    };

    const handleClick = (id) => {
        navigate(`/reports/${id}`);
    };

    const handleWriteReview = () => {
        navigate('/holdup/reports/create');
    };

    // 에러 발생 시 에러 메시지 표시
    if (error) {
        return <div>에러 발생: {error.message || '알 수 없는 오류'}</div>;
    }

    console.log('Current state:', { reportList, totalPages, error });
    console.log("리뷰 컴포넌트 재랜더링됨");

    return (
        <div>
            <h1>신고 게시판</h1>
            {reportList && reportList.length > 0 ? (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th >등록날짜</th>
                                <th >제목</th>
                                <th >닉네임</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportList.map(reportList => (
                                <tr key={reportList.id} onClick={() => handleClick(reportList.id)} style={{ cursor: 'pointer' }}>
                                    <td >{reportList.createDate}</td>
                                    <td >{reportList.title}</td>
                                    <td>{reportList.nickname}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>신고글이 없습니다.</p>
            )}

            <button onClick={handleWriteReview}>글쓰기</button>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default ReportForm;