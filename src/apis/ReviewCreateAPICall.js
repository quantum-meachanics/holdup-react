import { createReviewSuccess, createReviewFail } from "../modules/ReviewCreateModule";
import { tokenRequest } from "./Api";

export function callCreateReviewAPI(reviewInfo) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');

            // FormData 생성
            const formData = new FormData();
            formData.append("reviewInfo", new Blob([JSON.stringify(reviewInfo)], { type: "application/json" }));
            reviewInfo.images.forEach(image => formData.append("images", image));

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            console.log("reviewInfo:", formData.get("reviewInfo")); // JSON.stringify로 변환된 값 확인
            const images = formData.getAll("images");
            console.log("images:", images);


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
