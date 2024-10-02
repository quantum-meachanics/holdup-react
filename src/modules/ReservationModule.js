import { createActions, handleActions } from "redux-actions";

const initialState = {
    reservationInfo: null,
    error: null
};

export const CREATE_RESERVATION_SUCCESS = "reservation/CREATE_RESERVATION_SUCCESS";
export const CREATE_RESERVATION_FAIL = "reservation/CREATE_RESERVATION_FAIL";

export const { reservation: { createReservationSuccess, createReservationFail } } = createActions({
    [CREATE_RESERVATION_SUCCESS]: (reservationInfo) => ({ reservationInfo }),
    [CREATE_RESERVATION_FAIL]: (error) => ({ error })
});

const reservationReducer = handleActions({
    [CREATE_RESERVATION_SUCCESS]: (state, { payload: { reservationInfo } }) => {
        return {
            ...state,
            reservationInfo,
            error: null
        };
    },
    [CREATE_RESERVATION_FAIL]: (state, { payload: { error } }) => {
        return {
            ...state,
            reservationInfo: null,
            error
        };
    }
}, initialState);

export default reservationReducer;