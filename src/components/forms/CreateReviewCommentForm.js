// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Navigate } from 'react-router-dom';
// import { callCreateReviewCommentAPI } from '../../apis/CommentAPICall';

// function CreateReviewCommentForm() {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const navigate = Navigate;
//     const { commentInfo, error } = useSelector(state => state.reviewCommentReducer);
//     const [inputCommentInfo, setInputCommentInfo] = useState({
//         content: ''
//     });

//     // useEffect(() => {
//     //     dispatch(callCreateReviewCommentAPI(id));
//     //     console.log('Fetching review for id:', id);
//     // }, [dispatch, id]);

//     const onChangeHandler = e => {
//         setInputCommentInfo({
//             ...inputCommentInfo,
//             [e.target.name]: e.target.value
//         })
//     };

//     const onClickHandler = () => {
//         dispatch(callCreateReviewCommentAPI(id, inputCommentInfo));
//         navigate('/holdup/reviews');
//     };


//     if (error) return <div>에러 발생: {error}</div>;

//     return (
//         <div>
//             <h3>댓글 작성</h3>
//             <div>
//                 <span>내용</span>
//                 <input type='textarea' name='content' value={commentInfo.content} onChange={onChangeHandler} />
//             </div>

//             <button onClick={onClickHandler}>등록하기</button>

//         </div>
//     )
// }

// export default CreateReviewCommentForm;