import CommunitySidebar from "../components/commons/CommunitySidebar";
import InquiryDetailForm from "../components/forms/InquiryDetailForm";

function InquiryDetail() {
    return (
        <div style={{ display: "flex", margin: "20px 100px", flex: 1 }}>
            <CommunitySidebar />
            <InquiryDetailForm />
        </div>
    )
}

export default InquiryDetail