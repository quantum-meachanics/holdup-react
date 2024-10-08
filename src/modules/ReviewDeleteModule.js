import { createActions, handleActions } from "redux-actions";

const initialState = {
    deleteSuccess: false,
    error: null
};

export const DELETE_REVIEW_SUCCESS = "reviewDelete/DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAIL = "reviewDelete/DELETE_REVIEW_FAIL";

// 액션 생성
export const { reviewDelete: { deleteReviewSuccess, deleteReviewFail } } = createActions({
    [DELETE_REVIEW_SUCCESS]: () => ({ deleteSuccess: true }),
    [DELETE_REVIEW_FAIL]: (error) => ({ error })
});

// 리듀서
const reviewDeleteReducer = handleActions({
    [DELETE_REVIEW_SUCCESS]: (state) => {
        return {
            ...state,
            deleteSuccess: true,
            error: null
        };
    },

    [DELETE_REVIEW_FAIL]: (state, { payload: { error } }) => {
        return {
            ...state,
            deleteSuccess: false,
            error
        };
    }
}, initialState);

export default reviewDeleteReducer;