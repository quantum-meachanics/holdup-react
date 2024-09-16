import { NavLink } from "react-router-dom";

function CreateSpaceSuceessPage() {
    return (
        <>
            <h1>공간 등록을 완료했습니다!</h1>
            <NavLink to="/"><button>메인으로</button></NavLink>
        </>
    );
}

export default CreateSpaceSuceessPage;