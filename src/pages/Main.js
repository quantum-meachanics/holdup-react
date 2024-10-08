import { Link } from "react-router-dom";
import style from "../css/Main.module.css";

function Main() {
    return (
        <div className={style.mainPage}>
            <Link to="/holdup/createSpace" className={style.createSpaceButton}>
                <span className={style.title}>공간 등록하기</span>
                <span className={style.description}>사용하지 않는 공간을 등록해보세요</span>
                <div className={style.content}>
                    <span>✓ 사용하지 않는 공간이 있다면 OK</span>
                    <span>✓ 간단한 등록으로 누구나 쉽게</span>
                    <span>✓ 추가적인 작업없이 수익 창출</span>
                </div>
            </Link>

            <Link to="/holdup/spaces" className={style.useSpaceButton}>
                <span className={style.title} >공간 이용하기</span>
                <span className={style.description}>짐을 보관할 공간이 필요할 때</span>
                <div className={style.content}>
                    <span>✓ 인증된 사용자들로 안전하게</span>
                    <span>✓ 오픈마켓으로 다양한 공간들</span>
                    <span>✓ 합리적인 가격으로 저렴하게</span>
                </div>
            </Link>
        </div>
    );
}

export default Main;