import { createActions, handleActions } from "redux-actions";

const initialState = {
    pageList: [],
    totalPages: 0,
    error: null
};

export const GET_SPCAES_LIST_SUCCESS = "spaceList/GET_SPACE_LIST_SUCCESS";
export const GET_SPCAES_LIST_FAIL = "spaceList/GET_SPACE_LIST_FAIL";

export const { spaceList: { getSpaceListSeccess, getSpaceListFail } } = createActions({
    [GET_SPCAES_LIST_SUCCESS]: (spaceList, totalPages) => { (spaceList, totalPages) },
    [GET_SPCAES_LIST_FAIL]: (error) => { (error) }
});

const spacePageReducer = handleActions({
    [GET_SPCAES_LIST_SUCCESS]: (state, { payload }) => ({
        ...state,
        spaceList: payload.spaceList,
        totalPages: payload.totalPages,
        error: null
    }),
    [GET_SPCAES_LIST_FAIL]: (state, { payload }) => ({
        ...state,
        spaceList: [],
        totalPages: 0,
        error
    })
}, initialState);

export default spacePageReducer;