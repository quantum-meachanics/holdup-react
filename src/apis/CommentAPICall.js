import { tokenRequest } from "./Api";
import { getReviewCommentsSuccess, getReviewCommentsFail } from "../modules/ReviewCommentModule";
import { createReviewCommentsSuccess, createReviewCommentsFail } from "../modules/ReviewCommentCreateModule";
import { createReportCommentsSuccess, createReportCommentsFail } from "../modules/ReportCommentCreateModule";
import  { getReportCommentsSuccess, getReportCommentsFail } from "../modules/ReportCommentModule";


export function callGetReviewCommentAPI(id) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await tokenRequest(
                token,
                "GET",
                `/reviews/${id}/comments`
            );

            console.log('API Response:', response);

            dispatch(getReviewCommentsSuccess(response.result));
            
        } catch (error) {
            console.error('API Error:', error);
            dispatch(getReviewCommentsFail(error.message || "리뷰 댓글를 불러오는데 실패했습니다."));
        }
    };
}

export function callCreateReviewCommentAPI(id,commentInfo) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await tokenRequest(
                token,
                "POST",
                `/reviews/${id}/comments`,
                commentInfo
            );

            console.log('API Response:', response);

            dispatch(createReviewCommentsSuccess(response.result));
            
            dispatch(callGetReviewCommentAPI(id));

        } catch (error) {
            
            console.error('API Error:', error);

            dispatch(createReviewCommentsFail(error.message || "리뷰 댓글 추가를 실패했습니다."));
        }
    };
}

export function callGetReportCommentAPI(id) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await tokenRequest(
                token,
                "GET",
                `/reports/${id}/comments`
            );

            console.log('API Response:', response);

            dispatch(getReportCommentsSuccess(response.result));
            
        } catch (error) {
            console.error('API Error:', error);
            dispatch(getReportCommentsFail(error.message || "신고 댓글를 불러오는데 실패했습니다."));
        }
    };
}

export function callCreateReportCommentAPI(id,commentInfo) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await tokenRequest(
                token,
                "POST",
                `/reports/${id}/comments`,
                commentInfo
            );

            console.log('API Response:', response);

            dispatch(createReportCommentsSuccess(response.result));
            
            dispatch(callGetReportCommentAPI(id));

        } catch (error) {
            
            console.error('API Error:', error);

            dispatch(createReportCommentsFail(error.message || "신고 댓글 추가를 실패했습니다."));
        }
    };
}