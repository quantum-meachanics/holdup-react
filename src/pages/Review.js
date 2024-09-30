import CommunitySidebar from "../components/commons/CommunitySidebar";
import ReviewForm from "../components/forms/ReviewForm";

function Review() {
    return (
        <div style={{ display: "flex" }}>
            <CommunitySidebar />
            <ReviewForm />
        </div>
    )
}

export default Review;