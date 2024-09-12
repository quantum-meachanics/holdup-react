import { request } from "./Api";
import { login } from "../modules/UserModule";

export function callLoginAPI(loginInfo) {
    return async (dispatch, getState) => {
        const userList = await request("GET", "/member");

        const result = await userList.find(user =>
            user.id === loginInfo.id &&
            user.password === loginInfo.password
        );

        dispatch(login(result));
    }
}