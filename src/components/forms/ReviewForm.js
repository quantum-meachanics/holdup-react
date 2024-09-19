import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callGetReviewListAPI } from '../../apis/ReviewAPICall';
import Pagination from './Pagination';

function ReviewForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewList, pagingInfo, error } = useSelector(state => state.reviewReducer);
    const [page, setPage] = useState(0);

    useEffect(() => {
        console.log('Fetching reviews for page:', page);
        dispatch(callGetReviewListAPI(page));
    }, [dispatch, page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (error) {
        return <div>에러 발생: {error}</div>;
    }

    console.log('Current state:', { reviewList, pagingInfo, error });

    console.log("리뷰 컴포넌트 재랜더링됨");

    
    
    return (
        <div>
            <h2>리뷰 목록</h2>
            {reviewList && reviewList.length > 0 ? (
                reviewList.map(reviewList => (
                    <div key={reviewList.id}>
                        <h3>{reviewList.title}</h3>
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
            {pagingInfo && (
                <div>
                    {pagingInfo.currentPage > 0 && (
                        <button onClick={() => handlePageChange(pagingInfo.currentPage - 1)}>
                            이전
                        </button>
                    )}
                    {Array.from({ length: pagingInfo.endPage - pagingInfo.startPage + 1 }, (_, index) => (
                        <button
                            key={pagingInfo.startPage + index}
                            onClick={() => handlePageChange(pagingInfo.startPage + index)}
                            disabled={pagingInfo.currentPage === pagingInfo.startPage + index}
                        >
                            {pagingInfo.startPage + index + 1}
                        </button>
                    ))}
                    {pagingInfo.currentPage < pagingInfo.totalPages - 1 && (
                        <button onClick={() => handlePageChange(pagingInfo.currentPage + 1)}>
                            다음
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default ReviewForm;