import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { callCreateReviewCommentAPI } from '../../apis/CommentAPICall';
import style from "../../css/CreateReviewCommentForm.module.css";

function CreateReviewCommentForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { commentInfo, error } = useSelector(state => state.reviewCreateCommentReducer);
    const [inputCommentInfo, setInputCommentInfo] = useState({
        content: ''
    });

    useEffect(() => {
        if (error) {
            alert(error);
        } else if (commentInfo) {
            // 댓글 생성 성공 시 입력 필드 초기화
            setInputCommentInfo({ content: '' });
        }
    }, [commentInfo, error, id]);

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
        <div className={style.main}>
            <span className={style.title}>댓글달기</span>
            <input className={style.input} type='text' name='content' value={inputCommentInfo.content} onChange={onChangeHandler} />
            <button className={style.button} onClick={onClickHandler}>등록하기</button>

        </div>
    )
}

export default CreateReviewCommentForm;