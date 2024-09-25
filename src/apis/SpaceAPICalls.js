import { createSpaceFail, createSpaceSuccess } from "../modules/SpaceModule";
import { tokenRequest } from "./Api";

export function callCreateSpaceAPI(spaceInfo) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');

            // FormData 생성
            const formData = new FormData();
            formData.append("spaceInfo", new Blob([JSON.stringify(spaceInfo)], { type: "application/json" }));
            spaceInfo.images.forEach(image => formData.append("images", image));

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            
            console.log("spaceInfo:", formData.get("spaceInfo")); // JSON.stringify로 변환된 값 확인
            const images = formData.getAll("images");
            console.log("images:", images);

            const response = await tokenRequest(
                token,
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