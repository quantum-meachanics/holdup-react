import { createActions, handleActions } from "redux-actions";

const initialState = {
    spaceList: [],
    totalPages: 0,
    error: null
};

export const GET_ALL_SPACES_SUCCESS = "spaceList/GET_ALL_SPACES_SUCCESS";
export const GET_ALL_SPACES_FAIL = "spaceList/GET_ALL_SPACES_FAIL";

export const { spaceList: { getAllSpacesSuccess, getAllSpacesFail } } = createActions({
    [GET_ALL_SPACES_SUCCESS]: (spaceList, totalPages) => ({ spaceList, totalPages }),
    [GET_ALL_SPACES_FAIL]: (error) => ({ error })
});

const spacePageReducer = handleActions({
    [GET_ALL_SPACES_SUCCESS]: (state, { payload }) => ({
        ...state,
        spaceList: payload.spaceList,
        totalPages: payload.totalPages,
        error: null
    }),
    [GET_ALL_SPACES_FAIL]: (state, { payload: error }) => ({
        ...state,
        spaceList: [],
        totalPages: 0,
        error
    })
}, initialState);

export default spacePageReducer;