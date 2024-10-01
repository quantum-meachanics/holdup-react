import { createActions, handleActions } from "redux-actions";

const initialState = {
    spaceList: [],
    totalPages: 0,
    error: null
};

export const GET_SPACE_LIST_SUCCESS = "spaceList/GET_SPACE_LIST_SUCCESS";
export const GET_SPACE_LIST_FAIL = "spaceList/GET_SPACE_LIST_FAIL";

export const { spaceList: { getSpaceListSuccess, getSpaceListFail } } = createActions({
    [GET_SPACE_LIST_SUCCESS]: (spaceList, totalPages) => ({ spaceList, totalPages }),
    [GET_SPACE_LIST_FAIL]: (error) => ({ error })
});

const spacePageReducer = handleActions({
    [GET_SPACE_LIST_SUCCESS]: (state, { payload }) => ({
        ...state,
        spaceList: payload.spaceList,
        totalPages: payload.totalPages,
        error: null
    }),
    [GET_SPACE_LIST_FAIL]: (state, { payload: error }) => ({
        ...state,
        spaceList: [],
        totalPages: 0,
        error
    })
}, initialState);

export default spacePageReducer;