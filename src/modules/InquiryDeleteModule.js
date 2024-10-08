import { createActions, handleActions } from "redux-actions";

const initialState = {
    deleteSuccess: false,
    error: null
};

export const DELETE_INQUIRY_SUCCESS = "inquiryDelete/DELETE_INQUIRY_SUCCESS";
export const DELETE_INQUIRY_FAIL = "inquiryDelete/DELETE_INQUIRY_FAIL";

// 액션 생성
export const { inquiryDelete: { deleteInquirySuccess, deleteInquiryFail } } = createActions({
    [DELETE_INQUIRY_SUCCESS]: () => ({ deleteSuccess: true }),
    [DELETE_INQUIRY_FAIL]: (error) => ({ error })
});

// 리듀서
const inquiryDeleteReducer = handleActions({
    [DELETE_INQUIRY_SUCCESS]: (state) => {
        return {
            ...state,
            deleteSuccess: true,
            error: null
        };
    },

    [DELETE_INQUIRY_FAIL]: (state, { payload: { error } }) => {
        return {
            ...state,
            deleteSuccess: false,
            error
        };
    }
}, initialState);

export default inquiryDeleteReducer;