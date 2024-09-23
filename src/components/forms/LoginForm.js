import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../../css/LoginForm.css'; 
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
        dispatch(callLoginAPI(loginInfo));
    };

    useEffect(() => {
        if (error) {
            alert(error);
            setLoginInfo({ email: '', password: '' });
            dispatch(resetLoginUser());
        } else if (user) {
            // 로그인 성공 시 세션 저장 및 메인 페이지로 이동
            sessionStorage.setItem("isLogin", true);
            sessionStorage.setItem("user", JSON.stringify(user));
            navigate("/"); // 메인 페이지로 이동
        }
    }, [user, error, navigate, dispatch]);

    return (
        <div className="login-form">
            <div className="input-group">
                <label>ID:</label>
                <input type="text" name="email" value={loginInfo.email} onChange={onChangeHandler} />
            </div>
            <div className="input-group">
                <label>PASSWORD:</label>
                <input type="password" name="password" value={loginInfo.password} onChange={onChangeHandler} />
            </div>
            <button className="button" onClick={onClickHandler}>로그인</button>
            
            <div className="links">
                <div className="signup-link">
                    <a href="/holdup/signup">회원가입</a>
                </div>
                <div className="find-links">
                    <a href="/holdup/find-email">아이디 찾기</a>
                    <a href="/holdup/email-verification">비밀번호 찾기</a>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
