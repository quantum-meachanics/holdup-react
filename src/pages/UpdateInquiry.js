import InquiryUpdateForm from "../components/forms/InquiryUpdateForm";
import CommunitySidebar from "../components/commons/CommunitySidebar";

function UpdateInquiry() {
    return (
        <div style={{ display: "flex", flex: 1, margin: "20px 100px" }}>
            <CommunitySidebar />
            <InquiryUpdateForm />
        </div>
    );
}

export default UpdateInquiry;