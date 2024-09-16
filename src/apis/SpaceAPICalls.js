import { createSpaceFail, createSpaceSuccess } from "../modules/SpaceModule";
import { tokenRequest } from "./Api";

export function callCreateSpaceAPI(spaceInfo) {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            const response = await tokenRequest(
                token,
                "POST",
                "/spaces",
                spaceInfo
            )
            dispatch(createSpaceSuccess(response.spaceInfo));

        } catch (error) {
            dispatch(createSpaceFail(error.message || "공간 등록에 오류가 발생했습니다."))
        }
    };
}
