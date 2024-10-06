import { createActions, handleActions } from "redux-actions";

const initialState = {
    reportDetail: null,
    error: null
};

export const GET_REPORT_DETAIL_SUCCESS = "reportDetail/GET_REPORT_DETAIL_SUCCESS";
export const GET_REPORT_DETAIL_FAIL = "reportDetail/GET_REPORT_DETAIL_FAIL";

export const { reportDetail: { getReportDetailSuccess, getReportDetailFail } } = createActions({
    [GET_REPORT_DETAIL_SUCCESS]: (reportDetail) => ({ reportDetail }),
    [GET_REPORT_DETAIL_FAIL]: (error) => ({ error })
});

const reportDetailReducer = handleActions({
    [GET_REPORT_DETAIL_SUCCESS]: (state, { payload }) => ({
        ...state,
        reportDetail: payload.reportDetail,
        error: null
    }),
    [GET_REPORT_DETAIL_FAIL]: (state, { payload }) => ({
        ...state,
        reportDetail: null,
        error: payload.error
    })
}, initialState);

export default reportDetailReducer;
