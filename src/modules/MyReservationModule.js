import { createActions, handleActions } from "redux-actions";

const initialState = {
    myReservationList: [],
    totalPages: 0,
    error: null
};

export const GET_MY_RESERVATIONS_SUCCESS = "myReservationList/getMyReservationsSuccess";
export const GET_MY_RESERVATIONS_FAIL = "myReservationList/getMyReservationsFAIL";

export const { myReservationList: { getMyReservationsSuccess, getMyReservationsFail } } = createActions({
    [GET_MY_RESERVATIONS_SUCCESS]: (myReservationList, totalPages) => ({ myReservationList, totalPages }),
    [GET_MY_RESERVATIONS_FAIL]: (error) => ({ error })
});

const myReservationListReducer = handleActions({
    [GET_MY_RESERVATIONS_SUCCESS]: (state, { payload }) => ({
        ...state,
        myReservationList: payload.myReservationList,
        totalPages: payload.totalPages,
        error: null
    }),
    [GET_MY_RESERVATIONS_FAIL]: (state, { payload: error }) => ({
        ...state,
        myReservationList: null,
        totalPages: 0,
        error
    })
}, initialState);

export default myReservationListReducer;