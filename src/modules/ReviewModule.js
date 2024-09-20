import { createActions, handleActions } from "redux-actions";

const initialState = {
    reviewList: [],
    totalPages: 0,
    error: null
};

export const GET_REVIEW_LIST_SUCCESS = "reviewList/GET_REVIEW_LIST_SUCCESS";
export const GET_REVIEW_LIST_FAIL = "reviewList/GET_REVIEW_LIST_FAIL";

export const { reviewList: { getReviewListSuccess, getReviewListFail } } = createActions({
    [GET_REVIEW_LIST_SUCCESS]: (reviewList, totalPages) => ({ reviewList, totalPages }),
    [GET_REVIEW_LIST_FAIL]: (error) => ({ error })
});

const reviewReducer = handleActions({
    [GET_REVIEW_LIST_SUCCESS]: (state, { payload }) => ({
        ...state,
        reviewList: payload.reviewList,
        totalPages: payload.totalPages,

        error: null
    }),
    [GET_REVIEW_LIST_FAIL]: (state, { payload: error }) => ({
        ...state,
        reviewList: [],
        totalPages: 0,
        error
    })
}, initialState);

export default reviewReducer;