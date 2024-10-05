import { createActions, handleActions } from "redux-actions";

const initialState = {
    inquiryDetail: null,
    error: null
};

export const GET_INQUIRY_DETAIL_SUCCESS = "inquiryDetail/GET_INQUIRY_DETAIL_SUCCESS";
export const GET_INQUIRY_DETAIL_FAIL = "inquiryDetail/GET_INQUIRY_DETAIL_FAIL";

export const { inquiryDetail: { getInquiryDetailSuccess, getInquiryDetailFail } } = createActions({
    [GET_INQUIRY_DETAIL_SUCCESS]: (inquiryDetail) => ({ inquiryDetail }),
    [GET_INQUIRY_DETAIL_FAIL]: (error) => ({ error })
});

const inquiryDetailReducer = handleActions({
    [GET_INQUIRY_DETAIL_SUCCESS]: (state, { payload }) => ({
        ...state,
        inquiryDetail: payload.inquiryDetail,
        error: null
    }),
    [GET_INQUIRY_DETAIL_FAIL]: (state, { payload }) => ({
        ...state,
        inquiryDetail: null,
        error: payload.error
    })
}, initialState);

export default inquiryDetailReducer;
