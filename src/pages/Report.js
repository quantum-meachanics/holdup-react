import CommunitySidebar from "../components/commons/CommunitySidebar";
import ReportForm from "../components/forms/ReportForm";

function Report() {
    return (
        <div style={{ display: "flex" }}>
            <CommunitySidebar />
            <ReportForm />
        </div>
    )
}

export default Report;