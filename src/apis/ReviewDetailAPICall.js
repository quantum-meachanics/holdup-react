import { getReviewDetailSuccess, getReviewDetailFail } from '../modules/ReviewDetailModule';
import { tokenRequest } from './Api';

export function callGetReviewDetailAPI(id) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await tokenRequest(
                token,
                "GET",
                `/reviews/${id}`
            );

            console.log('API Response:', response);

            dispatch(getReviewDetailSuccess(response.result));
        } catch (error) {
            console.error('API Error:', error);
            dispatch(getReviewDetailFail(error.message || "리뷰 상세 정보를 불러오는데 실패했습니다."));
        }
    };
}