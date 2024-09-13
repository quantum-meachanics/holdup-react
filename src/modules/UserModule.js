import { createActions, handleActions } from "redux-actions";

const initialState = {
    isLogin: false,
    userInfo: null,
    error: null
};

export const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
export const LOGIN_FAIL = "user/LOGIN_FAIL";
export const RESET_LOGIN_USER = "user/RESET_LOGIN_USER";

// 액션 생성
export const { user: { loginSuccess, loginFail, resetLoginUser } } = createActions({
    [LOGIN_SUCCESS]: (userInfo) => ({ userInfo }),
    [LOGIN_FAIL]: (error) => ({ error }),
    [RESET_LOGIN_USER]: () => ({}),
});

// 리듀서
const userReducer = handleActions({
    [LOGIN_SUCCESS]: (state, { payload: { userInfo } }) => {
        localStorage.setItem("isLogin", true);
        localStorage.setItem("user", JSON.stringify(userInfo));
        return {
            ...state,
            isLogin: true,
            userInfo,
            error: null
        };
    },

    [LOGIN_FAIL]: (state, { payload: { error } }) => {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("user");
        return {
            ...state,
            isLogin: false,
            userInfo: null,
            error
        };
    },

    [RESET_LOGIN_USER]: (state) => {
        localStorage.removeItem("isLogin");
        localStorage.removeItem("user");
        return {
            ...state,
            isLogin: false,
            userInfo: null,
            error: null
        };
    },
}, initialState);

export default userReducer;