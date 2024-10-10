import MyPageSidebar from "../components/commons/MyPageSidebar";
import ReviewUpdateForm from "../components/forms/ReviewUpdateForm";

function UpdateReview() {
    return (
        <div style={{ display: "flex", margin: "20px 100px", flex: 1 }}>
            <MyPageSidebar />
            <ReviewUpdateForm />
        </div>
    );
}

export default UpdateReview;