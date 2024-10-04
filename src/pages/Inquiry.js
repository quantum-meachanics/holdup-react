import CommunitySidebar from "../components/commons/CommunitySidebar";
import InquiryForm from "../components/forms/InquiryForm";

function Inquiry() {
    return (
        <div style={{ display: "flex" }}>
            <CommunitySidebar />
            <InquiryForm />
        </div>
    )
}

export default Inquiry;