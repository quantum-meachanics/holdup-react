import { createSpaceFail, createSpaceSuccess } from "../modules/SpaceModule";
import { tokenRequest } from "./Api";

export function callCreateSpaceAPI(spaceInfo, imageFiles) {
    return async (dispatch) => {
        try {
            // FormData 생성
            const formData = new FormData();

            formData.append("spaceInfo", new Blob([JSON.stringify(spaceInfo)], { type: "application/json" }));
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
