import { getReviewListSuccess, getReviewListFail } from "../modules/ReviewModule";
import { tokenRequest } from "./Api";

export function callGetReviewListAPI(page = 0, size = 10) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await tokenRequest(
                token,
                "GET",
                `/reviews?page=${page}&size=${size}`
            );

            console.log('API Response:', response);

            // const reviewList = response.result.content || [];

            dispatch(getReviewListSuccess(
                response.result.content,
                response.result.totalPages,
                page,
                size,
                response.result.totalElements

            ));
        } catch (error) {
            console.error('API Error:', error);
            dispatch(getReviewListFail(error.message || "리뷰 목록을 불러오는데 실패했습니다."));
        }
    };
}