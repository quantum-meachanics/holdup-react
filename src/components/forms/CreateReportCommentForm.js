import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callCreateReportCommentAPI } from '../../apis/CommentAPICall';

function CreateReportCommentForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { commentInfo, error } = useSelector(state => state.reportCreateCommentReducer);
    const [inputCommentInfo, setInputCommentInfo] = useState({
        content: ''
    });

    useEffect(() => {
        if (error) {
            alert(error);
        } else if (commentInfo) {
            console.log('CommentInfo detected, resetting input field');
            setInputCommentInfo({ content: '' });
            console.log('Input field reset');
        }
    }, [commentInfo, error, id]);

    const onChangeHandler = e => {
        setInputCommentInfo({
            ...inputCommentInfo,
            [e.target.name]: e.target.value
        })
    };

    const onClickHandler = () => {
        dispatch(callCreateReportCommentAPI(id, inputCommentInfo));
    };


    if (error) return <div>에러 발생: {error}</div>;

    return (
        <div>
            <h3>댓글 작성</h3>
            <div>
                <span>내용</span>
                <input type='textarea' name='content' value={inputCommentInfo.content} onChange={onChangeHandler} />
            </div>

            <button onClick={onClickHandler}>등록하기</button>

        </div>
    )
}

export default CreateReportCommentForm;