import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callCreateReviewCommentAPI } from '../../apis/CommentAPICall';

function CreateReviewCommentForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate;
    const { commentInfo, error } = useSelector(state => state.reviewCreateCommentReducer);
    const [inputCommentInfo, setInputCommentInfo] = useState({
        content: ''
    });

    useEffect(() => {
        if (error) {
            alert(error);
        } else if (commentInfo) {
            navigate(`/reviews/${id}`);
        }
    }, [commentInfo, error, navigate, dispatch]);

    const onChangeHandler = e => {
        setInputCommentInfo({
            ...inputCommentInfo,
            [e.target.name]: e.target.value
        })
    };

    const onClickHandler = () => {
        dispatch(callCreateReviewCommentAPI(id, inputCommentInfo));
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

export default CreateReviewCommentForm;