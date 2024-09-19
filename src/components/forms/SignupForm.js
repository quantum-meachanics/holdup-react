import { useState } from "react";
import { request } from "../../apis/Api"; // api.js의 경로에 맞게 조정

function SignupForm() {
    const [signupInfo, setSignupInfo] = useState({
        email: '',
        password: '',
        nickname: '',
        phone: '',
        name: '',
        birthday: '',
        address: '',
    });

    const onChangeHandler = (e) => {
        setSignupInfo({
            ...signupInfo,
            [e.target.name]: e.target.value
        });
    };

    const onClickHandler = async () => {
        try {
            const response = await request('post', '/signup', signupInfo);
            alert(response.message); // 성공 메시지 출력
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입에 실패했습니다.");
        }
    };

    return (
        <>
            <label>아이디(이메일) : </label>
            <input type="text" name="email" value={signupInfo.email} onChange={onChangeHandler} />
            <label>비밀번호 : </label>
            <input type="password" name="password" value={signupInfo.password} onChange={onChangeHandler} />
            <label>닉네임 : </label>
            <input type="text" name="nickname" value={signupInfo.nickname} onChange={onChangeHandler} />
            <label>휴대폰번호 : </label>
            <input type="text" name="phone" value={signupInfo.phone} onChange={onChangeHandler} />
            <label>이름 : </label>
            <input type="text" name="name" value={signupInfo.name} onChange={onChangeHandler} />
            <label>생년월일 : </label>
            <input type="text" name="birthday" value={signupInfo.birthday} onChange={onChangeHandler} />
            <label>주소 : </label>
            <input type="text" name="address" value={signupInfo.address} onChange={onChangeHandler} />
            <button onClick={onClickHandler}>회원가입</button>
        </>
    );
}

export default SignupForm;
