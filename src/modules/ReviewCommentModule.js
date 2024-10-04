import { createActions, handleActions } from "redux-actions";

const initialState = {
    reviewComments: [],
    error: null
};

export const GET_REVIEW_COMMENTS_SUCCESS = "reviewComments/GET_REVIEW_COMMENTS_SUCCESS";
export const GET_REVIEW_COMMENTS_FAIL = "reviewComments/GET_REVIEW_COMMENTS_FAIL";

export const { reviewComments: { getReviewCommentsSuccess, getReviewCommentsFail } } = createActions({
    [GET_REVIEW_COMMENTS_SUCCESS]: (reviewComments) => ({ reviewComments }),
    [GET_REVIEW_COMMENTS_FAIL]: (error) => ({ error })
});

const reviewCommentReducer = handleActions({
    [GET_REVIEW_COMMENTS_SUCCESS]: (state, { payload }) => ({
        ...state,
        reviewComments: payload.reviewComments,
        error: null
    }),
    [GET_REVIEW_COMMENTS_FAIL]: (state, { payload }) => ({
        ...state,
        reviewComments: [],
        error: payload.error
    })
}, initialState);

export default reviewCommentReducer;
