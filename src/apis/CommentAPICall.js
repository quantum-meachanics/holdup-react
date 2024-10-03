import { tokenRequest } from "./Api";
import { getReviewCommentsSuccess, getReviewCommentsFail } from "../modules/ReviewCommentModule";
import { createReviewCommentsSuccess, createReviewCommentsFail } from "../modules/ReviewCommentCreateModule"

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

// export function callCreateReviewCommentAPI(id) {
//     return async (dispatch) => {
//         try {
//             const token = sessionStorage.getItem('token');
//             const response = await tokenRequest(
//                 token,
//                 "POST",
//                 `/reviews/${id}/comments`
//             );

//             console.log('API Response:', response);

//             dispatch(createReviewCommentsSuccess(response.result));
            
//         } catch (error) {
//             console.error('API Error:', error);
//             dispatch(createReviewCommentsFail(error.message || "리뷰 댓글를 불러오는데 실패했습니다."));
//         }
//     };
// }