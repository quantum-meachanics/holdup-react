import { createActions, handleActions } from "redux-actions";

const initialState = {
    reviewInfo: null,
    error: null
};

export const CREATE_REVIEW_SUCCESS = "review/CREATE_REVIEW_SUCCESS";
export const CREATE_REVIEW_FAIL = "review/CREATE_REVIEW_FAIL";

// 액션 생성
export const { review: { createReviewSuccess, createReviewFail } } = createActions({
    [CREATE_REVIEW_SUCCESS]: (reviewInfo) => ({ reviewInfo }),
    [CREATE_REVIEW_FAIL]: (error) => ({ error })
});

// 리듀서
const reviewcreateReducer = handleActions({
    [CREATE_REVIEW_SUCCESS]: (state, { payload: { reviewInfo } }) => {
        return {
            ...state,
            reviewInfo,
            error: null
        };
    },

    [CREATE_REVIEW_FAIL]: (state, { payload: { error } }) => {
        return {
            ...state,
            reviewInfo: null,
            error
        };
    }
}, initialState);

export default reviewcreateReducer;