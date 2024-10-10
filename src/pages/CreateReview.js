import MyPageSidebar from "../components/commons/MyPageSidebar";
import CreateReviewForm from "../components/forms/CreateReviewForm";

function CreateReview() {
    return (
        <div style={{ display: "flex", margin: "20px 100px", flex: 1 }}>
            <MyPageSidebar />
            <CreateReviewForm />
        </div>
    );
}

export default CreateReview;