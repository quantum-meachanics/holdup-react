import { Navigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import styles from '../css/Login.module.css'; 


function Login() {
    const loginStatus = !!localStorage.getItem('isLogin');
    if (loginStatus) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className={styles.loginContainer}>
            <h1>로그인 페이지</h1>
            <div className={styles.loginFormContainer}>
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
