import CommunitySidebar from "../components/commons/CommunitySidebar"
import CreateReviewCommentForm from "../components/forms/CreateReviewCommentForm"
import ReviewCommentForm from "../components/forms/ReviewCommentForm"
import ReviewDetailForm from "../components/forms/ReviewDetailForm"

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