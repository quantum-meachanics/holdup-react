import { Navigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

function Login() {

    // 로그인 상태라면 메인으로 이동시킴
    // const loginStatus = !!localStorage.getItem('isLogin');
    // if (loginStatus) {
    //     return <Navigate to="/" replace={true} />
    // }

    return (
        <>
            <h1>로그인 페이지</h1>
            <LoginForm />
        </>
    );
}

export default Login;