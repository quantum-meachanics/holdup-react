import { getSpaceDetailSuccess } from "../modules/SpaceDetailModule";
import { createSpaceFail, createSpaceSuccess } from "../modules/SpaceModule";
import { getAllSpacesFail, getAllSpacesSuccess } from "../modules/SpacePageModule";
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

export function callAllSpacesAPI(page = 0, size = 0) {
    return async (dispatch) => {
        try {
            const response = await tokenRequest(
                sessionStorage.getItem("token"),
                "GET",
                `/spaces?page=${page}&size=${size}`
            )

            dispatch(getAllSpacesSuccess(
                response.result.content,
                response.result.totalPages,
                page,
                size,
                response.result.totalElements
            ));

        } catch (error) {
            dispatch(getAllSpacesFail(error.message || "공간 페이지 조회를 실패했습니다."))
        }
    }
}

export function callSpaceDetailAPI(id) {
    return async (dispatch) => {
        try {
            const response = await tokenRequest(
                sessionStorage.getItem("token"),
                "GET",
                `/spaces/${id}`
            );
            dispatch(getSpaceDetailSuccess(response.result));

        } catch (error) {
            dispatch(getAllSpacesFail(error.message || "API 요청을 실패했습니다."))
        }
    };
}