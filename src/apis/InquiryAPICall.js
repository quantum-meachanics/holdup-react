import { tokenRequest } from "./Api";
import { getInquiryListSuccess, getInquiryListFail } from "../modules/InquiryModule"
import { createInquirySuccess, createInquiryFail } from "../modules/InquiryCreateModule";
import {getInquiryDetailSuccess, getInquiryDetailFail} from "../modules/InquiryDetailModule";
import { deleteInquirySuccess, deleteInquiryFail }  from "../modules/InquiryDeleteModule";

export function callGetInquiryListAPI(page = 0, size = 10) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await tokenRequest(
                token,
                "GET",
                `/inquiries?page=${page}&size=${size}`
            );

            console.log('API Response:', response);

            dispatch(getInquiryListSuccess(
                response.result.content,
                response.result.totalPages,
                page,
                size,
                response.result.totalElements

            ));
        } catch (error) {
            console.error('API Error:', error);
            dispatch(getInquiryListFail(error.message || "문의 목록을 불러오는데 실패했습니다."));
        }
    };
}

export function callCreateInquiryAPI(inquiryInfo, imageFiles) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');

            // FormData 생성
            const formData = new FormData();

            // 입력한 정보를 formData에 넣을때 Blob으로 감싸서 json으로잘 전송될수있게함
            formData.append("inquiryInfo", new Blob([JSON.stringify(inquiryInfo)], { type: "application/json" }));

            // formData에 첨부한 이미지들 저장
            imageFiles.forEach(image => formData.append("images", image));

            const response = await tokenRequest(
                token,
                "POST",
                "/inquiries",
                formData
            )

            console.log('API Response:', response);

            dispatch(createInquirySuccess(response.inquiryInfo));

            dispatch(callGetInquiryListAPI(0, 10));

        } catch (error) {
            dispatch(createInquiryFail(error.message || "문의 등록에 오류가 발생했습니다."))
        }
    };
}



export function callGetInquiryDetailAPI(id) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await tokenRequest(
                token,
                "GET",
                `/inquiries/${id}`
            );

            console.log('API Response:', response);

            dispatch(getInquiryDetailSuccess(response.result));
        } catch (error) {
            console.error('API Error:', error);
            dispatch(getInquiryDetailFail(error.message || "문의 상세 정보를 불러오는데 실패했습니다."));
        }
    };
}



export function callUpdateInquiryAPI(id, modifyInfo, newImages, deleteImage) {
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
                `/inquiries/${id}`,
                formData

            )

            console.log('API Response:', response);

            // 수정 완료후  다시 inquiryDetail 불러오기
            dispatch(callGetInquiryDetailAPI(id));

            

        } catch (error) {
            dispatch(getInquiryDetailFail(error.message || "리뷰 수정에 오류가 발생했습니다."))
        }
    };
}

export function callDeleteInquiryAPI(id) {
    return async (dispatch) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await tokenRequest(
                token,
                "DELETE",
                `/inquiries/${id}`
            );

            console.log('API Response:', response);

            // 삭제 성공 후 처리 (예: 알림 표시, 페이지 리다이렉트 등)
            dispatch(deleteInquirySuccess(response.result));

            dispatch(callGetInquiryListAPI(0,10));

            return true;
        } catch (error) {
            console.error('API Error:', error);
            // 에러 처리 (예: 에러 메시지 표시)
            dispatch(deleteInquiryFail(error.message || "리뷰 삭제에 오류가 발생했습니다."))
        }
    };
}