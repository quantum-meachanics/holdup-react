import CommunitySidebar from "../components/commons/CommunitySidebar"
import ReviewForm from "../components/forms/ReviewForm"
import style from "../css/Review.module.css"

function Review() {
    return (
        <div className={style.review}>
            <CommunitySidebar />
            <ReviewForm />
        </div>
    )
}

export default Review;