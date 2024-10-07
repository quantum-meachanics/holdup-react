import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callGetReportCommentAPI } from '../../apis/CommentAPICall';

function ReportCommentForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { reportComments, error } = useSelector(state => state.reportCommentReducer);

    useEffect(() => {
        dispatch(callGetReportCommentAPI(id));
        console.log('Fetching review for id:', id);
    }, [dispatch, id]);

    console.log(reportComments);
    

    if (error) return <div>에러 발생: {error}</div>;

    return (
        <div>
            <h3>댓글 목록</h3>
            {Array.isArray(reportComments) && reportComments.length > 0 ? (
                reportComments.map((comment, index) => (
                    <div key={index}>
                        <p>날짜: {comment.createDate}</p>
                        <p>닉네임: {comment.nickname}</p>
                        <p>내용: {comment.content}</p>
                    </div>
                ))
            ) : (
                <h4>댓글이 존재하지 않습니다.</h4>
            )}
        </div>
    )
}

export default ReportCommentForm;