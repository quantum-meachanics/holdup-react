import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from '../../css/Login.module.css'; 
import { callLoginAPI } from "../../apis/UserAPICalls";
import { resetLoginUser } from "../../modules/UserModule";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, error } = useSelector(state => state.userReducer);

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
        dispatch(callLoginAPI(loginInfo, navigate)); // navigate를 함께 전달
    };

    useEffect(() => {
        console.log("User 상태가 변경되었습니다:", user);
        
        if (user) {
            console.log("로그인 성공:", user);
            sessionStorage.setItem("isLogin", true);
            sessionStorage.setItem("user", JSON.stringify(user));
            // navigate는 이제 API 호출 후 처리
        } else if (error) {
            console.error("로그인 오류:", error);
            alert(error);
            setLoginInfo({ email: '', password: '' }); // 입력 필드 초기화
            dispatch(resetLoginUser()); // 로그인 상태 초기화
        } 
    }, [user, error, dispatch]);

    return (
        <div className={styles.loginForm}>
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
        </div>
    );
}

export default LoginForm;
