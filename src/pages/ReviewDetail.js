import ReviewDetailForm from "../components/forms/ReviewDetailForm"
import ReviewCommentForm from "../components/forms/ReviewCommentForm"
import CreateReviewCommentForm from "../components/forms/CreateReviewCommentForm"

function ReviewDetail() {
    return(
        <>
            <ReviewDetailForm/>
            <CreateReviewCommentForm/>
            <ReviewCommentForm/>
        </>
    )
}

export default ReviewDetail