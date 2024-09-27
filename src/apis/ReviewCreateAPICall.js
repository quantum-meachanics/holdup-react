import { createReviewSuccess, createReviewFail } from "../modules/ReviewCreateModule";
import { tokenRequest } from "./Api";

export function callCreateReviewAPI(reviewInfo, imageFiles) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');

            // FormData 생성
            const formData = new FormData();

            // 입력한 정보를 formData에 넣을때 Blob으로 감싸서 json으로잘 전송될수있게함
            formData.append("reviewInfo", new Blob([JSON.stringify(reviewInfo)], { type: "application/json" }));

            // formData에 첨부한 이미지들 저장
            imageFiles.forEach(image => formData.append("images", image));

            const response = await tokenRequest(
                token,
                "POST",
                "/reviews",
                formData
            )

            console.log('API Response:', response);

            dispatch(createReviewSuccess(response.reviewInfo));

        } catch (error) {
            dispatch(createReviewFail(error.message || "리뷰 등록에 오류가 발생했습니다."))
        }
    };
}
