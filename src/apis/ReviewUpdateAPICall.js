import { updateReviewSuccess, updateReviewFail } from "../modules/ReviewUpdateModule";
import { tokenRequest } from "./Api";

export function callUpdateReviewAPI(id, modifyInfo, newImages, deletedImageId ) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');

            // FormData 생성
            const formData = new FormData();

            // 입력한 정보를 formData에 넣을 때 Blob으로 감싸서 json으로 잘 전송될 수 있게 함
            formData.append("modifyInfo", new Blob([JSON.stringify(modifyInfo)], { type: "application/json" }));

            // formData에 첨부한 이미지들 저장
            newImages.forEach(newImages => formData.append("newImages", newImages));

            // 삭제할 이미지 ID 추가 (필요한 경우)
            if (deletedImageId && deletedImageId.length > 0) {
                formData.append("deletedImages", new Blob([JSON.stringify(deletedImageId)], { type: "application/json" }));
            }

            const response = await tokenRequest(
                token,
                "PUT",
                `/reviews/${id}`,
                formData
            )

            console.log('API Response:', response);

            dispatch(updateReviewSuccess(response.modifyInfo));

        } catch (error) {
            dispatch(updateReviewFail(error.message || "리뷰 수정에 오류가 발생했습니다."))
        }
    };
}