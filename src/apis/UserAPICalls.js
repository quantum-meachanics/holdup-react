import { loginFail, loginSuccess } from "../modules/UserModule"; // 액션 가져오기
import { tokenRequest } from "./Api"; // API 요청 함수

export function callLoginAPI(loginInfo, navigate) {
    return async (dispatch) => {
        try {
            // 'POST'로 '/holdup/login'에 로그인 입력 정보 전송
            const response = await tokenRequest(null, "POST", "/login", loginInfo); // 로그인 정보 전송, 토큰 필요 없음

            console.log("Response 응답로그 확인", response);

            // 서버에서 로그인 성공 시 JWT 토큰 반환
            if (response.token) {
                // 필요한 사용자 정보만 추출
                const userData = {
                    id: response.userInfo.id,
                    name: response.userInfo.name,       // 이름
                    nickname: response.userInfo.nickname, // 닉네임
                    email: response.userInfo.email,       // 이메일
                    role: response.userInfo.role,          // 역할
                    password: response.userInfo.password, // 비밀번호
                };

                console.log("추출된 사용자 정보 확인", userData);
                sessionStorage.setItem("token", response.token); // JWT 토큰 저장
                sessionStorage.setItem("isLogin", true); // 로그인 상태 저장
                dispatch(loginSuccess(userData)); // Redux 상태 업데이트

                navigate("/"); // 로그인 성공 후 메인 페이지로 이동
            } else {
                dispatch(loginFail("아이디와 비밀번호를 확인해주세요."));
            }

        } catch (error) {
            dispatch(loginFail(error.message || '로그인 실패'));
        }
    };
}

