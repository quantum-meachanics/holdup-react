import { createActions, handleActions } from "redux-actions";

const initialState = {
    inquiryInfo: null,
    error: null
};

export const CREATE_INQUIRY_SUCCESS = "inquiry/CREATE_INQUIRY_SUCCESS";
export const CREATE_INQUIRY_FAIL = "inquiry/CREATE_INQUIRY_FAIL";

// 액션 생성
export const { inquiry: { createInquirySuccess, createInquiryFail } } = createActions({
    [CREATE_INQUIRY_SUCCESS]: (inquiryInfo) => ({ inquiryInfo }),
    [CREATE_INQUIRY_FAIL]: (error) => ({ error })
});

// 리듀서
const inquiryCreateReducer = handleActions({
    [CREATE_INQUIRY_SUCCESS]: (state, { payload: { inquiryInfo } }) => {
        return {
            ...state,
            inquiryInfo,
            error: null
        };
    },

    [CREATE_INQUIRY_FAIL]: (state, { payload: { error } }) => {
        return {
            ...state,
            inquiryInfo: null,
            error
        };
    }
}, initialState);

export default inquiryCreateReducer;