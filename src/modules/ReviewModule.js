import { createActions, handleActions } from "redux-actions";

const initialState = {
    reviewList: [],
    pagingInfo: null,
    error: null
};

export const GET_REVIEW_LIST_SUCCESS = "reviewList/GET_REVIEW_LIST_SUCCESS";
export const GET_REVIEW_LIST_FAIL = "reviewList/GET_REVIEW_LIST_FAIL";

export const { reviewList: { getReviewListSuccess, getReviewListFail } } = createActions({
    [GET_REVIEW_LIST_SUCCESS]: (reviewList, pagingInfo) => ({ reviewList, pagingInfo }),
    [GET_REVIEW_LIST_FAIL]: (error) => ({ error })
});

const reviewReducer = handleActions({
    [GET_REVIEW_LIST_SUCCESS]: (state, { payload }) => ({
        ...state,
        reviewList: payload.content,
        pagingInfo: payload.pagingInfo,
        error: null
    }),
    [GET_REVIEW_LIST_FAIL]: (state, { payload: error }) => ({
        ...state,
        reviewList: [],
        pagingInfo: null,
        error
    })
}, initialState);

export default reviewReducer;