import { createActions, handleActions } from "redux-actions";

const initialState = {
    isLogin: false,
    userInfo: null,
    error: null
};

export const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
export const LOGIN_FAIL = "user/LOGIN_FAIL";
export const RESET_LOGIN_USER = "user/RESET_LOGIN_USER";
export const LOGOUT_USER = "user/LOGOUT_USER";
export const UPDATE_USER_INFO_SUCCESS = "user/UPDATE_USER_INFO_SUCCESS";
export const UPDATE_USER_INFO_FAIL = "user/UPDATE_USER_INFO_FAIL";

// 액션 생성
export const { user: { loginSuccess, loginFail, resetLoginUser , logoutUser , updateUserInfoSuccess, updateUserInfoFail } } = createActions({
    [LOGIN_SUCCESS]: (userInfo) => ({ userInfo }),
    [LOGIN_FAIL]: (error) => ({ error }),
    [RESET_LOGIN_USER]: () => ({}),
    [LOGOUT_USER]: () => ({}),
    [UPDATE_USER_INFO_SUCCESS]: (userInfo) => ({ userInfo }),
    [UPDATE_USER_INFO_FAIL]: (error) => ({ error }),
});

// 리듀서
const userReducer = handleActions({
    [LOGIN_SUCCESS]: (state, { payload: { userInfo } }) => {
        sessionStorage.setItem("isLogin", true);
        sessionStorage.setItem("user", JSON.stringify(userInfo));
        return {
            ...state,
            isLogin: true,
            userInfo,
            error: null
        };
    },

    [LOGIN_FAIL]: (state, { payload: { error } }) => {
        sessionStorage.removeItem("isLogin");
        sessionStorage.removeItem("user");
        return {
            ...state,
            isLogin: false,
            userInfo: null,
            error
        };
    },

    [RESET_LOGIN_USER]: (state) => {
        sessionStorage.removeItem("isLogin");
        sessionStorage.removeItem("user");
        return {
            ...state,
            isLogin: false,
            userInfo: null,
            error: null
        };
    },

    [LOGOUT_USER]: (state) => {
        sessionStorage.removeItem("isLogin");
        sessionStorage.removeItem("user");
        return {
            ...state,
            isLogin: false,
            userInfo: null,
            error: null
        };
    },

    [UPDATE_USER_INFO_SUCCESS]: (state, { payload: { userInfo } }) => ({
        ...state,
        userInfo,
        error: null
    }),

    [UPDATE_USER_INFO_FAIL]: (state, { payload: { error } }) => ({
        ...state,
        error
    }),

}, initialState);

export default userReducer;