import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callGetReportDetailAPI } from '../../apis/ReportAPICall';
import style from "../../css/ReportDetailForm.module.css";

function ReportDetailForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reportDetail, error } = useSelector(state => state.reportDetailReducer);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        dispatch(callGetReportDetailAPI(id));
        console.log('Fetching review for id:', id);

        // SessionStorage에서 사용자 정보 가져오기
        const userInfo = JSON.parse(sessionStorage.getItem('user'));
        setCurrentUser(userInfo);
    }, []);

    // 로그인한 사용자와 글쓴이와 같은지 확인
    const isAuthor = () => {
        return currentUser && reportDetail && currentUser.nickname === reportDetail.nickname;
    };

    const handleGoBack = () => {
        navigate('/holdup/reports');
    };

    const handleUpdate = () => {
        navigate(`/holdup/reports/update/${id}`);
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

    return (
        <div className={style.main}>
            <span className={style.title}>신고 게시판</span>
            {reportDetail ? (
                <>
                    <span className={style.reportTitle}>{reportDetail.title}</span>
                    <span>작성자: {reportDetail.nickname}</span>
                    <span>등록날짜: {formatDateTime(reportDetail.createDate)}</span>
                    <span>내용: {reportDetail.content}</span>
                    <div className={style.imageSection}>
                        {reportDetail.imageUrl && reportDetail.imageUrl.length > 0 ? (
                            reportDetail.imageUrl.map((url, index) => (
                                <img className={style.image} key={index} src={url} alt={`리뷰 이미지 ${index + 1}`} />
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
                    </>
                )}
            </div>
        </div>

    );
}

export default ReportDetailForm;