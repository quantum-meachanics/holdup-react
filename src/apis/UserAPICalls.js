import { loginFail, loginSuccess } from "../modules/UserModule";
import { request } from "./Api";

export function callLoginAPI(loginInfo) {
    return async (dispatch) => {
        try {
            // 'POST'로 '/holdup/login'에 로그인 입력 정보 전송
            const response = await request("POST", "/login", loginInfo);

            console.log("Response 응답로그 확인", response);
            
            // 서버에서 로그인 성공시 JWT 토큰 반환
            if (response.token) {
                console.log("response.data 확인", response.data);
                console.log("response.userInfo 확인", response.userInfo);
                console.log("localStorage에 member객체 정보 확인", localStorage.getItem("member"));

                localStorage.setItem("token", response.token); // JWT 토큰 저장
                localStorage.setItem("isLogin", true); // 로그인 상태 저장
                dispatch(loginSuccess(response.user)); // 로그인 성공 처리 (redux 상태 업데이트)
            } else {
                dispatch(loginFail("아이디와 비밀번호를 확인해주세요."));
            }

        } catch (error) {
            dispatch(loginFail(error.message || '로그인 실패'));
        }
    }
}

// export function callSignupAPI(signupInfo) {
//     return async (dispatch) => {
//         try {
//             // 'POST'로 '/member/signup'에 회원가입 정보 전송
//             const response = await request("POST", "/member/signup", signupInfo);

//             dispatch(signupSeccess(response.user));

//         } catch (error) {
//             dispatch(signupFail("회원가입 실패"));
//         }
//     }
// }
