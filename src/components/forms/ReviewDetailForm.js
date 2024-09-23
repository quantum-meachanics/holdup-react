import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callGetReviewDetailAPI } from '../../apis/ReviewDetailAPICall';

function ReviewDetailForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewDetail, error } = useSelector(state => state.reviewDetailReducer);

    useEffect(() => {
        dispatch(callGetReviewDetailAPI(id));
        console.log('Fetching review for id:', id);
    }, [dispatch, id]);

    const handleGoBack = () => {
        navigate('/holdup/reviews');
    };

    if (error) return <div>에러 발생: {error}</div>;

    return (
        <div>
            <h1>리뷰 상세</h1>
            <div>
                {reviewDetail ? (
                    <>
                        <h2>{reviewDetail.title}</h2>
                        <p>작성자: {reviewDetail.nickname}</p>
                        <p>등록날짜: {reviewDetail.createDate}</p>
                        <p>평점: {reviewDetail.rating}</p>
                        <p>예약 ID: {reviewDetail.reservation.id}</p>
                        <p>내용: {reviewDetail.content}</p>
                    </>
                ) : (
                    <h2>게시글이 존재 하지 않습니다.</h2>
                )}


            </div>
            <button onClick={handleGoBack}>목록으로 돌아가기</button>
        </div>
    );
}

export default ReviewDetailForm;