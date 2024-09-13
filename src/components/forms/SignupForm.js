// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function SignupForm() {

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [signupInfo, setSignupInfo] = useState({
//         email: '',
//         password: '',
//         nickname: '',
//         phone: '',
//         name: '',
//         birthday: ''
//     });

//     const onChangeHandler = e => {
//         setSignupInfo({
//             ...signupInfo,
//             [e.target.name]: e.target.value
//         });
//     };

//     const onClickHandler = () => {
//         dispatch
//     }
    
//     return (
//         <>
//             <label>아이디(이메일) : </label>
//             <input type="text" name="email" value={signupInfo.email} onChange={onChangeHandler} />
//             <label>비밀번호 : </label>
//             <input type="text" name="password" value={signupInfo.password} onChange={onChangeHandler} />
//             <label>닉네임 : </label>
//             <input type="text" name="nickname" value={signupInfo.nickname} onChange={onChangeHandler} />
//             <label>휴대폰번호 : </label>
//             <input type="text" name="phone" value={signupInfo.phone} onChange={onChangeHandler} />
//             <label>이름 : </label>
//             <input type="text" name="name" value={signupInfo.name} onChange={onChangeHandler} />
//             <label>생년월일 : </label>
//             <input type="text" name="birthday" value={signupInfo.birthday} onChange={onChangeHandler} />
//             <button onClick={onClickHandler}>회원가입</button>
//         </>
//     );
// }