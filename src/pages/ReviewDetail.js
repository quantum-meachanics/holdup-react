import ReviewDetailForm from "../components/forms/ReviewDetailForm"
import ReviewCommentForm from "../components/forms/ReviewCommentForm"
import CreateReviewCommentForm from "../components/forms/CreateReviewCommentForm"
import CommunitySidebar from "../components/commons/CommunitySidebar"

function ReviewDetail() {
    return (
        <div style={{ display: "flex", margin: "20px 100px", flex: 1 }}>
            <CommunitySidebar />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <ReviewDetailForm />
                <CreateReviewCommentForm />
                <ReviewCommentForm />
            </div>
        </div>
    )
}

export default ReviewDetail