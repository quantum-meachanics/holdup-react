import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callGetInquiryDetailAPI } from '../../apis/InquiryAPICall';

function ReviewDetailForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { inquiryDetail, error } = useSelector(state => state.inquiryDetailReducer);

    useEffect(() => {
        dispatch(callGetInquiryDetailAPI(id));
        console.log('Fetching review for id:', id);
    }, []);

    const handleGoBack = () => {
        navigate('/holdup/inquiries');
    };

    const handleUpdate = () => {
        navigate(`/holdup/inquiries/${id}`);
    };

    if (error) return <div>에러 발생: {error}</div>;



    return (
        <div>
            <h1>리뷰 상세</h1>
            <div>
                {inquiryDetail ? (
                    <>
                        <h2>{inquiryDetail.title}</h2>
                        <p>작성자: {inquiryDetail.nickname}</p>
                        <p>등록날짜: {inquiryDetail.createDate}</p>
                        <p>내용: {inquiryDetail.content}</p>
                        <div>
                            <h3>이미지</h3>
                            <div>
                                {inquiryDetail.imageUrl && inquiryDetail.imageUrl.length > 0 ? (
                                    inquiryDetail.imageUrl.map((url, index) => (
                                        <img key={index} src={url} alt={`문의 이미지 ${index + 1}`} />
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