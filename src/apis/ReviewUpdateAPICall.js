import { updateReviewSuccess, updateReviewFail } from "../modules/ReviewUpdateModule"
import { tokenRequest } from "./Api";

export function callUpdateReviewAPI(id, modifyInfo, newImages, deleteImage) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');

            // FormData 생성
            const formData = new FormData();

            // modifyInfo가 null이 아닐 때만 추가
            if (modifyInfo !== null && modifyInfo !== undefined) {
                formData.append("modifyInfo", new Blob([JSON.stringify(modifyInfo)], { type: "application/json" }));
            }

            // newImages가 존재하고 배열일 때만 이미지 추가
            if (newImages) {
                if (Array.isArray(newImages) && newImages.length > 0) {
                    // 배열이고 내용이 있는 경우
                    newImages.forEach((image) => {
                        if (image && image.size > 0) {  // 파일이 존재하고 크기가 0보다 큰 경우에만 추가
                            formData.append('newImages', image);
                        }
                    });
                } else if (!Array.isArray(newImages) && newImages.size > 0) {
                    // 단일 이미지이고 크기가 0보다 큰 경우
                    formData.append('newImages', newImages);
                }
            }
            // deleteImage가 null이 아닐 때만 추가
            if (deleteImage !== null && deleteImage !== undefined) {
                formData.append("deleteImage", new Blob([JSON.stringify(deleteImage)], { type: "application/json" }));
            }



            const response = await tokenRequest(
                token,
                "PUT",
                `/reviews/${id}`,
                formData

            )

            console.log('API Response:', response);

            dispatch(updateReviewSuccess(response.result));

        } catch (error) {
            dispatch(updateReviewFail(error.message || "리뷰 수정에 오류가 발생했습니다."))
        }
    };
}