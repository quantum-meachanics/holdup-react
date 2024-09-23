import { createReviewSuccess, createReviewFail } from "../modules/ReviewCreateModule";
import { tokenRequest } from "./Api";

export function callCreateReviewAPI(reviewInfo) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await tokenRequest(
                token,
                "POST",
                "/reviews",
                reviewInfo
            )

            console.log('API Response:', response);
            
            dispatch(createReviewSuccess(response.reviewInfo));

        } catch (error) {
            dispatch(createReviewFail(error.message || "리뷰 등록에 오류가 발생했습니다."))
        }
    };
}
