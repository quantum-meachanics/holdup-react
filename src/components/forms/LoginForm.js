import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

    // 입력창 변화 감지하여 값 담기
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

            setLoginInfo({
                email: '',
                password: ''
            });

            dispatch(resetLoginUser());
        } else if (user) {
            sessionStorage.setItem("isLogin", true);
            sessionStorage.setItem("user", JSON.stringify(user));
            navigate("/");
        }
    }, [user, error, navigate, dispatch]);

    return (
        <>
            <label>ID : </label>
            <input type="text" name="email" value={loginInfo.email} onChange={onChangeHandler} />
            &nbsp; &nbsp; &nbsp;
            <label>PASSWORD : </label>
            <input type="text" name="password" value={loginInfo.password} onChange={onChangeHandler} />
            &nbsp; &nbsp; &nbsp;
            <button onClick={onClickHandler}>로그인</button>
        </>
    );
}

export default LoginForm;