import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callGetReviewListAPI } from '../../apis/ReviewAPICall';
import Pagination from './Pageination';

function ReviewForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewList, totalPages, currentPage ,error } = useSelector(state => state.reviewReducer);
    // const [currentPage, setCurrentPage] = useState(0);

    // 컴포넌트가 마운트되거나 currentPage가 변경될 때 리뷰 목록 가져오기
    useEffect(() => {
        console.log('Fetching reviews for page:', currentPage);
        dispatch(callGetReviewListAPI(currentPage));
    }, [dispatch, currentPage]);

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        if (newPage !== currentPage) {
            dispatch(callGetReviewListAPI(newPage));
        }
    };

    // 에러 발생 시 에러 메시지 표시
    if (error) {
        return <div>에러 발생: {error.message || '알 수 없는 오류'}</div>;
    }
    console.log('Current state:', { reviewList, totalPages, error });

    console.log("리뷰 컴포넌트 재랜더링됨");



    return (
        <div>
            <h2>리뷰 목록</h2>
            {reviewList && reviewList.length > 0 ? (
                reviewList.map(reviewList => (
                    <div key={reviewList.id}>
                        <h3>{reviewList.title}</h3>
                        <p>id: {reviewList}</p>
                        <p>내용: {reviewList.content}</p>
                        <p>평점: {reviewList.rating}</p>
                        {reviewList.reservation && (
                            <div>
                                <p>예약 ID: {reviewList.reservation.id}</p>
                            </div>
                        )}
                    </div>

                ))
            ) : (
                <p>리뷰가 없습니다.</p>
            )}
            
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            
        </div>
    );
}

export default ReviewForm;