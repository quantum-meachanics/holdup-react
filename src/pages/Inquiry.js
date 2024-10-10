import CommunitySidebar from "../components/commons/CommunitySidebar";
import InquiryForm from "../components/forms/InquiryForm";

function Inquiry() {
    return (
        <div style={{ display: "flex", margin: "20px 100px", flex: 1 }}>
            <CommunitySidebar />
            <InquiryForm />
        </div>
    )
}

export default Inquiry;