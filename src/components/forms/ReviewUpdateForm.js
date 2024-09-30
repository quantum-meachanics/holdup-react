import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callGetReviewDetailAPI } from '../../apis/ReviewDetailAPICall';

function ReviewDetailForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewDetail, error } = useSelector(state => state.reviewDetailReducer);

    
    // useEffect(() => {
    //     dispatch(callGetReviewDetailAPI(id));
    //     console.log('Fetching review for id:', id);
    // }, [dispatch, id]);

    const handleGoBack = () => {
        navigate('/holdup/reviews');
    };

    const handleUpdate = () => {
        navigate(`/holdup/reviews/${id}`);
    };

    if (error) return <div>에러 발생: {error}</div>;



    return (
        <div>
            <div>
                {reviewDetail ? (
                    <>
                        <span>제목: </span>
                        <input type='text' name='title' defaultValue={reviewDetail.title} />

                        <span>내용:</span>
                        <input type='textarea' name='content' defaultValue={reviewDetail.content} />

                        <span>평점: </span>
                        <input type='text' name='rating' defaultValue={reviewDetail.rating} />

                        <span>예약ID: </span>
                        <input type='text' name='reservationId' defaultValue={reviewDetail.reservation.id} />
                        <div>
                            <h3>이미지</h3>
                            <input type="file" multiple accept="image/*"/>
                            <div>
                                {reviewDetail.imageUrl && reviewDetail.imageUrl.length > 0 ? (
                                    <img src={reviewDetail.imageUrl}/>
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
            <button onClick={handleGoBack}>돌아가기</button>
            <button onClick={handleUpdate}>작성하기</button>
        </div>
    );
}

export default ReviewDetailForm;