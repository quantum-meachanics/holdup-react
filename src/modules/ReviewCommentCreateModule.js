// import { createActions, handleActions } from "redux-actions";

// const initialState = {
//     commentInfo: null,
//     error: null
// };

// export const CREATE_REVIEW_COMMENTS_SUCCESS = "createReviewComments/CREATE_REVIEW_COMMENTS_SUCCESS";
// export const CREATE_REVIEW_COMMENTS_FAIL = "createReviewComments/CREATE_REVIEW_COMMENTS_FAIL";

// export const { commentInfo: { createReviewCommentsSuccess, createReviewCommentsFail } } = createActions({
//     [CREATE_REVIEW_COMMENTS_SUCCESS]: (commentInfo) => ({ commentInfo }),
//     [CREATE_REVIEW_COMMENTS_FAIL]: (error) => ({ error })
// });

// const reviewCreateCommentReducer = handleActions({
//     [CREATE_REVIEW_COMMENTS_SUCCESS]: (state, { payload }) => ({
//         ...state,
//         commentInfo: payload.commentInfo,
//         error: null
//     }),
//     [CREATE_REVIEW_COMMENTS_FAIL]: (state, { payload }) => ({
//         ...state,
//         commentInfo: null,
//         error: payload.error
//     })
// }, initialState);

// export default reviewCreateCommentReducer;
