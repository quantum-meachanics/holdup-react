import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callGetReviewDetailAPI, callDeleteReviewAPI } from '../../apis/ReviewAPICall';
import style from "../../css/ReviewDetail.module.css";
import StarRating from './Ratingform';

function ReviewDetailForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewDetail, error } = useSelector(state => state.reviewDetailReducer);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        dispatch(callGetReviewDetailAPI(id));
        console.log('Fetching review for id:', id);

        // SessionStorage에서 사용자 정보 가져오기
        const userInfo = JSON.parse(sessionStorage.getItem('user'));
        setCurrentUser(userInfo);
    }, []);

    // 로그인한 사용자와 글쓴이와 같은지 확인
    const isAuthor = () => {
        return currentUser && reviewDetail && currentUser.nickname === reviewDetail.nickname;
    };

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
    const reservationIdClickHandler = (id) => {
        navigate(`/holdup/myPage/reservations`);
    };

    const handleDelete = async () => {
        try {
            dispatch(callDeleteReviewAPI(id));
            // 삭제 성공 시 처리
            alert('리뷰가 성공적으로 삭제되었습니다.');
            navigate('/holdup/reviews'); // 목록 페이지로 이동
        } catch (error) {
            // 삭제 실패 시 처리
            alert('리뷰 삭제에 실패했습니다: ' + error.message);
        }
    };

    if (error) return <div>에러 발생: {error}</div>;



    return (
        <div className={style.main}>
            {reviewDetail ? (
                <>
                    <span className={style.title}>{reviewDetail.title}</span>
                    <span>작성자: {reviewDetail.nickname}</span>
                    <span>등록날짜: {formatDateTime(reviewDetail.createDate)}</span>
                    <span>평점: <StarRating rating={reviewDetail.rating} readOnly={true} /></span>
                    <span onClick={() => reservationIdClickHandler(reviewDetail.reservation.id)}>예약 ID: {reviewDetail.reservation.id}</span>
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

            <button onClick={handleGoBack}>목록으로 돌아가기</button>
            {isAuthor() && (
                <>
                    <button onClick={handleUpdate}>수정</button>
                    <button onClick={handleDelete}>삭제</button>
                </>
            )}
        </div>
    );
}

export default ReviewDetailForm;