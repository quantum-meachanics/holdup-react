import { tokenRequest } from "./Api"

export function callCreateReservationAPI(reservationInfo) {
    return async (dispatch)=> {
        try {
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