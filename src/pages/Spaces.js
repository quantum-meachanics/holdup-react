import CommunitySidebar from "../components/commons/CommunitySidebar";
import style from "../css/Spcaes.module.css"

function Spaces() {
    return (
        <div className={style.spaces}>
            <CommunitySidebar />
            <h1>공간 리스트입니다.</h1>
        </div>
    );
}

export default Spaces;