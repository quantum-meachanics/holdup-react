import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callGetReviewDetailAPI } from '../../apis/ReviewAPICall';

function ReviewDetailForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewDetail, error } = useSelector(state => state.reviewDetailReducer);

    useEffect(() => {
        dispatch(callGetReviewDetailAPI(id));
        console.log('Fetching review for id:', id);
    }, []);

    const handleGoBack = () => {
        navigate('/holdup/reviews');
    };

    const handleUpdate = () => {
        navigate(`/holdup/reviews/update/${id}`);
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

        // 페이지 이동 핸들러
        const spaceNameClickHandler = (id) => {
            navigate(`/holdup/myPage/reservations`);
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
                        <p>등록날짜: {formatDateTime(reviewDetail.createDate)}</p>
                        <p>평점: {reviewDetail.rating}</p>
                        <p onClick={() => spaceNameClickHandler(reviewDetail.reservation.id)} style={{ cursor: 'pointer' }}>예약 ID: {reviewDetail.reservation.id}</p>
                        <p>내용: {reviewDetail.content}</p>
                        <div>
                            <h3>이미지</h3>
                            <div>
                                {reviewDetail.imageUrl && reviewDetail.imageUrl.length > 0 ? (
                                    reviewDetail.imageUrl.map((url, index) => (
                                        <img key={index} src={url} alt={`리뷰 이미지 ${index + 1}`} />
                                    ))
                                ) : (
                                    <p>이미지가 없습니다.</p>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <h2>게시글이 존재 하지 않습니다.</h2>
                )}



            </div>
            <button onClick={handleGoBack}>목록으로 돌아가기</button>
            <button onClick={handleUpdate}>수정</button>
        </div>

    );
}

export default ReviewDetailForm;