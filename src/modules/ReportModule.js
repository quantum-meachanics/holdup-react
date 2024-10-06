import { createActions, handleActions } from "redux-actions";

const initialState = {
    reportList: [],
    totalPages: 0,
    error: null
};

export const GET_REPORT_LIST_SUCCESS = "reportList/GET_REPORT_LIST_SUCCESS";
export const GET_REPORT_LIST_FAIL = "reportList/GET_REPORT_LIST_FAIL";

export const { reportList: { getReportListSuccess, getReportListFail } } = createActions({
    [GET_REPORT_LIST_SUCCESS]: (reportList, totalPages) => ({ reportList, totalPages }),
    [GET_REPORT_LIST_FAIL]: (error) => ({ error })
});

const reportReducer = handleActions({
    [GET_REPORT_LIST_SUCCESS]: (state, { payload }) => ({
        ...state,
        reportList: payload.reportList,
        totalPages: payload.totalPages,
        error: null
    }),
    [GET_REPORT_LIST_FAIL]: (state, { payload: error }) => ({
        ...state,
        reportList: [],
        totalPages: 0,
        error
    })
}, initialState);

export default reportReducer;