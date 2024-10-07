import { createActions, handleActions } from "redux-actions";

const initialState = {
    reportInfo: null,
    error: null
};

export const CREATE_REPORT_SUCCESS = "report/CREATE_REPORT_SUCCESS";
export const CREATE_REPORT_FAIL = "report/CREATE_REPORT_FAIL";

// 액션 생성
export const { report: { createReportSuccess, createReportFail } } = createActions({
    [CREATE_REPORT_SUCCESS]: (reportInfo) => ({ reportInfo }),
    [CREATE_REPORT_FAIL]: (error) => ({ error })
});

// 리듀서
const reportCreateReducer = handleActions({
    [CREATE_REPORT_SUCCESS]: (state, { payload: { reportInfo } }) => {
        return {
            ...state,
            reportInfo,
            error: null
        };
    },

    [CREATE_REPORT_FAIL]: (state, { payload: { error } }) => {
        return {
            ...state,
            reportInfo: null,
            error
        };
    }
}, initialState);

export default reportCreateReducer;