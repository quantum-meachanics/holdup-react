import CommunitySidebar from "../components/commons/CommunitySidebar";
import style from "../css/Guideline.module.css";

function Guideline() {
    return (
        <>
            <CommunitySidebar />
            <div className={style.main}>
                <span className={style.title}>가이드라인</span>
                <img src={`${process.env.PUBLIC_URL}/images/guideline.webp`} width="600px" height="600px" alt="guideline" />
            </div>
        </>
    );
}

export default Guideline;