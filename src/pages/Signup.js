import SignupForm from "../components/forms/SignupForm";
import style from '../css/Signup.module.css'

function Signup() {
    return (
        <div className={style.signup_container}>
            <h1>회원가입 페이지</h1>
            <p>회원이 되어 다양한 서비스를 경험해 보세요!</p>
            <SignupForm />
        </div>
    );
}

export default Signup;
