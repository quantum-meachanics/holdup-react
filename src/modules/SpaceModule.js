import { createActions, handleActions } from "redux-actions";

const initialState = {
    spaceInfo: null,
    error: null
};

export const CREATE_SPACE_SUCCESS = "space/CREATE_SPACE_SUCCESS";
export const CREATE_SPACE_FAIL = "space/CREATE_SPACE_FAIL";

// 액션 생성
export const { space: { createSpaceSuccess, createSpaceFail } } = createActions({
    [CREATE_SPACE_SUCCESS]: (spaceInfo) => ({ spaceInfo }),
    [CREATE_SPACE_FAIL]: (error) => ({ error })
});

// 리듀서
const spaceReducer = handleActions({
    [CREATE_SPACE_SUCCESS]: (state, { payload: { spaceInfo } }) => {
        return {
            ...state,
            spaceInfo,
            error: null
        };
    },

    [CREATE_SPACE_FAIL]: (state, { payload: { error } }) => {
        return {
            ...state,
            spaceInfo: null,
            error
        };
    }
}, initialState);

export default spaceReducer;