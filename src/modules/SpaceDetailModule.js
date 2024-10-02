import { createActions, handleActions } from "redux-actions";

const initialState = {
    spaceDetail: null,
    error: null
};

export const GET_SPACE_DETAIL_SUCCESS = "spaceDetail/GET_SPACE_DETAIL_SUCCESS";
export const GET_SPACE_DETAIL_FAIL = "spaceDetail/GET_SPACE_DETAIL_FAIL";

export const { spaceDetail: { getSpaceDetailSuccess, getSpaceDetailFail } } = createActions({
    [GET_SPACE_DETAIL_SUCCESS]: (spaceDetail) => ({ spaceDetail }),
    [GET_SPACE_DETAIL_FAIL]: (error) => ({ error })
});

const spaceDetailReducer = handleActions({
    [GET_SPACE_DETAIL_SUCCESS]: (state, { payload }) => ({
        ...state,
        spaceDetail: payload.spaceDetail,
        error: null
    }),
    [GET_SPACE_DETAIL_FAIL]: (state, { payload: error }) => ({
        ...state,
        spaceDetail: null,
        error
    })
}, initialState);

export default spaceDetailReducer;