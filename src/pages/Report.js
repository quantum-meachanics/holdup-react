import CommunitySidebar from "../components/commons/CommunitySidebar";
import ReportForm from "../components/forms/ReportForm";

function Report() {
    return (
        <div style={{ display: "flex", margin: "20px 100px", flex: 1 }}>
            <CommunitySidebar />
            <ReportForm />
        </div>
    )
}

export default Report;