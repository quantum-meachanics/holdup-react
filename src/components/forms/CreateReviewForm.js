import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { callCreateReviewAPI } from "../../apis/ReviewCreateAPICall"; 

function CreateReviewForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { reviewInfo, error } = useSelector(state => state.reviewcreateReducer);

    const [inputReviewInfo, setReviewInfo] = useState({
        title:'',
        content:'',
        rating: '',
        reservationId : ''
    });

    const onChangeHandler = e => {
        setReviewInfo({
            ...inputReviewInfo,
            [e.target.name]: e.target.value
        })
    };

    
    const onClickHandler = () => {
        dispatch(callCreateReviewAPI(inputReviewInfo));
    };


    useEffect(() => {
        if (error) {
            alert(error);
        } else if (reviewInfo) {
            navigate("/holdiup/reviews");
        }
    }, [reviewInfo, error, navigate]);

    return (
        <>
            <span>제목 : </span>
            <input type="text" name="title" value={inputReviewInfo.title} onChange={onChangeHandler} />

            <span>내용 : </span>
            <textarea type="text" name="content" value={inputReviewInfo.content} onChange={onChangeHandler} />

            <span>별점 : </span>
            <input type="text" name="rating" value={inputReviewInfo.rating} onChange={onChangeHandler} />

            <span>예약ID: </span>
            <input type="text" name="reservationId" value={inputReviewInfo.reservationId} onChange={onChangeHandler} />

            <button onClick={onClickHandler}>등록하기</button>
        </>
    );
}

export default CreateReviewForm;