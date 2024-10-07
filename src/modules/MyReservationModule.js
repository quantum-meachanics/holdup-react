import { createActions, handleActions } from "redux-actions";

const initialState = {
    reservationList: [],
    totalPages: 0,
    error: null
};

export const GET_MY_RESERVATIONS_SUCCESS = "reservationList/getMyReservationsSuccess";
export const GET_MY_RESERVATIONS_FAIL = "reservationList/getMyReservationsFAIL";

export const { reservationList: { getMyReservationsSuccess, getMyReservationsFail } } = createActions({
    [GET_MY_RESERVATIONS_SUCCESS]: (reservationList, totalPages) => ({ reservationList, totalPages }),
    [GET_MY_RESERVATIONS_FAIL]: (error) => ({ error })
});

const reservationListReducer = handleActions({
    [GET_MY_RESERVATIONS_SUCCESS]: (state, { payload }) => ({
        ...state,
        reservationList: payload.reservationList,
        totalPages: payload.totalPages,
        error: null
    }),
    [GET_MY_RESERVATIONS_FAIL]: (state, { payload: error }) => ({
        ...state,
        reservationList: null,
        totalPages: 0,
        error
    })
}, initialState);

export default reservationListReducer;