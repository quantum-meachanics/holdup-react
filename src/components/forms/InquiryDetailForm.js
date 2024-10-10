import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callGetInquiryDetailAPI, callDeleteInquiryAPI } from '../../apis/InquiryAPICall';
import style from "../../css/InquiryDetailForm.module.css";

function InquiryDetailForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { inquiryDetail, error } = useSelector(state => state.inquiryDetailReducer);
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        dispatch(callGetInquiryDetailAPI(id));
        console.log('Fetching review for id:', id);


        // SessionStorage에서 사용자 정보 가져오기
        const userInfo = JSON.parse(sessionStorage.getItem('user'));
        setCurrentUser(userInfo);
    }, []);

    // 로그인한 사용자와 글쓴이와 같은지 확인
    const isAuthor = () => {
        return currentUser && inquiryDetail && currentUser.nickname === inquiryDetail.nickname;
    };

    const handleGoBack = () => {
        navigate('/holdup/inquiries');
    };

    const handleUpdate = () => {
        navigate(`/holdup/inquiries/update/${id}`);
    };

    if (error) return <div>에러 발생: {error}</div>;

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

    const handleDelete = async () => {
        try {
            dispatch(callDeleteInquiryAPI(id));
            // 삭제 성공 시 처리
            alert('게시글이 성공적으로 삭제되었습니다.');
            navigate('/holdup/inquiries'); // 목록 페이지로 이동
        } catch (error) {
            // 삭제 실패 시 처리
            alert('게시글 삭제에 실패했습니다: ' + error.message);
        }
    };

    return (
        <div className={style.main}>
            <span className={style.title}>문의 게시판</span>
            {inquiryDetail ? (
                <>
                    <span className={style.inquiryTitle}>{inquiryDetail.title}</span>
                    <span>작성자: {inquiryDetail.nickname}</span>
                    <span>등록날짜: {formatDateTime(inquiryDetail.createDate)}</span>
                    <span>내용: {inquiryDetail.content}</span>
                    <div className={style.imageSection}>
                        {inquiryDetail.imageUrl && inquiryDetail.imageUrl.length > 0 ? (
                            inquiryDetail.imageUrl.map((url, index) => (
                                <img className={style.images} key={index} src={url} alt={`문의 이미지 ${index + 1}`} />
                            ))
                        ) : (
                            <p>이미지가 없습니다.</p>
                        )}
                    </div>
                </>
            ) : (
                <h2>게시글이 존재 하지 않습니다.</h2>
            )}

            <div className={style.buttonSection}>
                <button className={style.button} onClick={handleGoBack}>목록으로 돌아가기</button>
                {isAuthor() && (
                    <>
                        <button className={style.button} onClick={handleUpdate}>수정</button>
                        <button className={style.button} onClick={handleDelete}>삭제</button>
                    </>
                )}
            </div>
        </div>

    );
}

export default InquiryDetailForm;