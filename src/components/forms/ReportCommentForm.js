import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callGetReportCommentAPI } from '../../apis/CommentAPICall';
import style from "../../css/ReportCommentForm.module.css";

function ReportCommentForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { reportComments, error } = useSelector(state => state.reportCommentReducer);

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
        return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    };

    useEffect(() => {
        dispatch(callGetReportCommentAPI(id));
        console.log('Fetching review for id:', id);
    }, [dispatch, id]);

    console.log(reportComments);


    if (error) return <div>에러 발생: {error}</div>;

    return (
        <div className={style.main}>
            {Array.isArray(reportComments) && reportComments.length > 0 ? (
                reportComments.map((comment, index) => (
                    <div className={style.commentRow} key={index}>
                        <span className={style.nickname}>{comment.nickname}</span>
                        <span className={style.content}>{comment.content}</span>
                        <span className={style.date}>{formatDateTime(comment.createDate)}</span>
                    </div>
                ))
            ) : (
                <h4>댓글이 존재하지 않습니다.</h4>
            )}
        </div>
    )
}

export default ReportCommentForm;