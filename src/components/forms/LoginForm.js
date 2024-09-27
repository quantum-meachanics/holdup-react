import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from '../../css/Login.module.css';
import { callLoginAPI } from "../../apis/UserAPICalls"; // API 호출 함수
import { resetLoginUser } from "../../modules/UserModule"; // 상태 초기화 액션

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
        dispatch(callLoginAPI(loginInfo, navigate)); // API 호출
    };

    useEffect(() => {
        if (user) {
            sessionStorage.setItem("isLogin", "true");
            sessionStorage.setItem("user", JSON.stringify(user));
            navigate('/'); // 로그인 후 메인 페이지로 리다이렉트

        } else if (error) {
            alert(error); // 에러 알림
            setLoginInfo({ email: '', password: '' }); // 입력 초기화
            dispatch(resetLoginUser()); // 상태 초기화
        }
    }, [user, error, dispatch, navigate]);

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
            <button className={styles.loginButton} onClick={onClickHandler}>로그인</button>
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