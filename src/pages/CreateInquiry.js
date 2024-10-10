import CommunitySidebar from "../components/commons/CommunitySidebar";
import CreateInquiryForm from "../components/forms/CreateInquiryForm";

function CreateInquiry() {
    return (
        <div style={{ display: "flex", flex: 1, margin: "20px 100px" }}>
            <CommunitySidebar />
            <CreateInquiryForm />
        </div>
    );
}

export default CreateInquiry;