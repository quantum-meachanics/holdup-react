import { createActions, handleActions } from "redux-actions";

const initialState = {
    inquiryList: [],
    totalPages: 0,
    error: null
};

export const GET_INQUIRY_LIST_SUCCESS = "inquiryList/GET_INQUIRY_LIST_SUCCESS";
export const GET_INQUIRY_LIST_FAIL = "inquiryList/GET_INQUIRY_LIST_FAIL";

export const { inquiryList: { getInquiryListSuccess, getInquiryListFail } } = createActions({
    [GET_INQUIRY_LIST_SUCCESS]: (inquiryList, totalPages) => ({ inquiryList, totalPages }),
    [GET_INQUIRY_LIST_FAIL]: (error) => ({ error })
});

const inqueiryReducer = handleActions({
    [GET_INQUIRY_LIST_SUCCESS]: (state, { payload }) => ({
        ...state,
        inquiryList: payload.inquiryList,
        totalPages: payload.totalPages,
        error: null
    }),
    [GET_INQUIRY_LIST_FAIL]: (state, { payload: error }) => ({
        ...state,
        inquiryList: [],
        totalPages: 0,
        error
    })
}, initialState);

export default inqueiryReducer;