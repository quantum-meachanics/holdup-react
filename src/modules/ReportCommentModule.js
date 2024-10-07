import { createActions, handleActions } from "redux-actions";

const initialState = {
    reportComments: [],
    error: null
};

export const GET_REPORT_COMMENTS_SUCCESS = "reportComments/GET_REPORT_COMMENTS_SUCCESS";
export const GET_REPORT_COMMENTS_FAIL = "reportComments/GET_REPORT_COMMENTS_FAIL";

export const { reportComments: { getReportCommentsSuccess, getReportCommentsFail } } = createActions({
    [GET_REPORT_COMMENTS_SUCCESS]: (reportComments) => ({ reportComments }),
    [GET_REPORT_COMMENTS_FAIL]: (error) => ({ error })
});

const reportCommentReducer = handleActions({
    [GET_REPORT_COMMENTS_SUCCESS]: (state, { payload }) => ({
        ...state,
        reportComments: payload.reportComments,
        error: null
    }),
    [GET_REPORT_COMMENTS_FAIL]: (state, { payload }) => ({
        ...state,
        reportComments: [],
        error: payload.error
    })
}, initialState);

export default reportCommentReducer;
