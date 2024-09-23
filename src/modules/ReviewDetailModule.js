import { createActions, handleActions } from "redux-actions";

const initialState = {
    reviewDetail: null,
    error: null
};

export const GET_REVIEW_DETAIL_SUCCESS = "reviewDetail/GET_REVIEW_DETAIL_SUCCESS";
export const GET_REVIEW_DETAIL_FAIL = "reviewDetail/GET_REVIEW_DETAIL_FAIL";

export const { reviewDetail: { getReviewDetailSuccess, getReviewDetailFail } } = createActions({
    [GET_REVIEW_DETAIL_SUCCESS]: (reviewDetail) => ({ reviewDetail }),
    [GET_REVIEW_DETAIL_FAIL]: (error) => ({ error })
});

const reviewDetailReducer = handleActions({
    [GET_REVIEW_DETAIL_SUCCESS]: (state, { payload }) => ({
        ...state,
        reviewDetail: payload.reviewDetail,
        error: null
    }),
    [GET_REVIEW_DETAIL_FAIL]: (state, { payload }) => ({
        ...state,
        reviewDetail: null,
        error: payload.error
    })
}, initialState);

export default reviewDetailReducer;
