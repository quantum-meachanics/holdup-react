import CommunitySidebar from "../components/commons/CommunitySidebar";
import ReviewForm from "../components/forms/ReviewForm";

function Review() {
    return (
        <div style={{ display: "flex", margin: "20px 100px", flex: 1 }}>
            <CommunitySidebar />
            <ReviewForm />
        </div>
    )
}

export default Review;