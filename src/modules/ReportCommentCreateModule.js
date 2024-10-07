import { createActions, handleActions } from "redux-actions";

const initialState = {
    commentInfo: null,
    error: null
};

export const CREATE_REPORT_COMMENTS_SUCCESS = "createReportComments/CREATE_REPORT_COMMENTS_SUCCESS";
export const CREATE_REPORT_COMMENTS_FAIL = "createReportComments/CREATE_REPORT_COMMENTS_FAIL";

export const { createReportComments : { createReportCommentsSuccess, createReportCommentsFail }} = createActions({
    [CREATE_REPORT_COMMENTS_SUCCESS]: (commentInfo) => ({ commentInfo }),
    [CREATE_REPORT_COMMENTS_FAIL]: (error) => ({ error })
});

const reportCreateCommentReducer = handleActions({
    [CREATE_REPORT_COMMENTS_SUCCESS]: (state, { payload: { commentInfo } }) => {
        return {
            ...state,
            commentInfo,
            error: null
        };
    },
    [CREATE_REPORT_COMMENTS_FAIL]: (state, { payload: {error} }) => {
        return{
        ...state,
        commentInfo: null,
        error
        };
    }
}, initialState);

export default reportCreateCommentReducer;
