import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callCreateReportCommentAPI } from '../../apis/CommentAPICall';
import style from "../../css/CreateReportComment.module.css";

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
        <div className={style.main}>
            <span className={style.title}>댓글달기</span>
            <input className={style.input} type='text' name='content' value={inputCommentInfo.content} onChange={onChangeHandler} />
            <button className={style.button} onClick={onClickHandler}>등록하기</button>
        </div>
    )
}

export default CreateReportCommentForm;