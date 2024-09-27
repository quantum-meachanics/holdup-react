import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from '../../css/Login.module.css'; 
import { callLoginAPI } from "../../apis/UserAPICalls";
import { resetLoginUser } from "../../modules/UserModule";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, error, loading } = useSelector(state => state.userReducer);

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const onChangeHandler = e => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        });
    };

    const onClickHandler = () => {
        dispatch(callLoginAPI(loginInfo, navigate));
    };

    const onSubmitHandler = e => {
        e.preventDefault(); // 기본 폼 제출 방지
        onClickHandler(); // 클릭 핸들러 호출
    };

    useEffect(() => {
        if (user) {
            console.log("로그인 성공:", user);
            sessionStorage.setItem("isLogin", true);
            sessionStorage.setItem("user", JSON.stringify(user));
        } else if (error) {
            console.error("로그인 오류:", error);
            alert(error);
            setLoginInfo({ email: '', password: '' });
            dispatch(resetLoginUser());
        } 
    }, [user, error, dispatch]);

    return (
        <form className={styles.loginForm} onSubmit={onSubmitHandler}>
            <div className={styles.loginInputGroup}>
                <label>ID:</label>
                <input 
                    type="text" 
                    name="email" 
                    value={loginInfo.email} 
                    onChange={onChangeHandler} 
                    required 
                />
            </div>
            <div className={styles.loginInputGroup}>
                <label>PASSWORD:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={loginInfo.password} 
                    onChange={onChangeHandler} 
                    required 
                />
            </div>
            <button className={styles.loginButton} type="submit" disabled={loading}>
                {loading ? "로그인 중..." : "로그인"}
            </button>
            
            <div className={styles.links}>
                <div className={styles.signupLink}>
                    <a href="/holdup/signup">회원가입</a>
                </div>
                <div className={styles.findLinks}>
                    <a href="/holdup/find-email">아이디 찾기</a>
                    <a href="/holdup/email-verification">비밀번호 찾기</a>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;
