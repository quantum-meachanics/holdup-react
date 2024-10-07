import { createReservationFail, createReservationSuccess } from "../modules/ReservationModule";
import { getMyReservationsFail, getMyReservationsSuccess } from "../modules/MyReservationModule";
import { tokenRequest } from "./Api";

export function callCreateReservationAPI(reservationInfo) {
    return async (dispatch) => {
        try {

            console.log("예약할 공간 아이디", reservationInfo.spaceId)
            console.log("요청할 예약 정보", reservationInfo)

            const response = await tokenRequest(
                sessionStorage.getItem("token"),
                "POST",
                "/reservations",
                reservationInfo
            );

            dispatch(createReservationSuccess(response.reservationInfo));

        } catch (error) {
            dispatch(createReservationFail(error.message || "예약 신청 API 호출 에러 발생"));
        }
    };
}

export function callMyReservationsAPI(page = 0, size = 0) {
    return async (dispatch) => {
        try {
            const response = await tokenRequest(
                sessionStorage.getItem("token"),
                "GET",
                `/reservations?page=${page}&size=${size}`
            );

            dispatch(getMyReservationsSuccess(
                response.result.content,
                response.result.totalPages,
                page,
                size,
                response.result.totalElements
            ));

        } catch (error) {
            dispatch(getMyReservationsFail(error.message || "예약 조회 API 요청을 실패했습니다."));
        }
    };
}