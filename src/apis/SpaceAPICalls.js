import { createSpaceFail, createSpaceSuccess } from "../modules/SpaceModule";
import { tokenRequest } from "./Api";

export function callCreateSpaceAPI(spaceInfo, imageFiles) {
    return async (dispatch) => {
        try {
            // FormData 생성
            const formData = new FormData();

            // 입력한 정보를 formData에 넣을때 Blob으로 감싸서 json으로잘 전송될수있게함
            formData.append("spaceInfo", new Blob([JSON.stringify(spaceInfo)], { type: "application/json" }));

            // formData에 첨부한 이미지들 저장
            imageFiles.forEach(image => formData.append("images", image));

            const response = await tokenRequest(
                sessionStorage.getItem('token'),
                "POST",
                "/spaces",
                formData
            )
            dispatch(createSpaceSuccess(response.spaceInfo));

        } catch (error) {
            dispatch(createSpaceFail(error.message || "공간 등록에 오류가 발생했습니다."))
        }
    };
}
