import { Navigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import '../css/Login.css'; // 추가할 CSS 파일

function Login() {
    const loginStatus = !!localStorage.getItem('isLogin');
    if (loginStatus) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="login-container">
            <h1>로그인 페이지</h1>
            <div className="login-form-container">
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
