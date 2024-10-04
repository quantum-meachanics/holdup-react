import { createActions, handleActions } from "redux-actions";

const initialState = {
    commentInfo: null,
    error: null
};

export const CREATE_REVIEW_COMMENTS_SUCCESS = "createReviewComments/CREATE_REVIEW_COMMENTS_SUCCESS";
export const CREATE_REVIEW_COMMENTS_FAIL = "createReviewComments/CREATE_REVIEW_COMMENTS_FAIL";

export const { createReviewCommentsSuccess, createReviewCommentsFail } = createActions({
    [CREATE_REVIEW_COMMENTS_SUCCESS]: (commentInfo) => ({ commentInfo }),
    [CREATE_REVIEW_COMMENTS_FAIL]: (error) => ({ error })
});

const reviewCreateCommentReducer = handleActions({
    [CREATE_REVIEW_COMMENTS_SUCCESS]: (state, { payload: { commentInfo } }) => {
        return {
            ...state,
            commentInfo,
            error: null
        };
    },
    [CREATE_REVIEW_COMMENTS_FAIL]: (state, { payload: {error} }) => {
        return{
        ...state,
        commentInfo: null,
        error
        };
    }
}, initialState);

export default reviewCreateCommentReducer;
