import { createActions, handleActions } from "redux-actions";

const initialState = {
    modifyInfo: null,
    error: null
};

export const UPDATE_REVIEW_SUCCESS = "review/UPDATE_REVIEW_SUCCESS";
export const UPDATE_REVIEW_FAIL = "review/UPDATE_REVIEW_FAIL";

// 액션 생성
export const { review: { updateReviewSuccess, updateReviewFail } } = createActions({
    [UPDATE_REVIEW_SUCCESS]: (modifyInfo) => ({ modifyInfo }),
    [UPDATE_REVIEW_FAIL]: (error) => ({ error })
});

// 리듀서
const reviewUpdateReducer = handleActions({
    [UPDATE_REVIEW_SUCCESS]: (state, { payload: { modifyInfo } }) => ({
        ...state,
        modifyInfo,
        error: null
    }),
    [UPDATE_REVIEW_FAIL]: (state, { payload: { error } }) => ({
        ...state,
        modifyInfo: null,
        error
    })
}, initialState);

export default reviewUpdateReducer;