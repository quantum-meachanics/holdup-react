import ReportUpdateForm from "../components/forms/ReportUpdateForm";
import CommunitySidebar from "../components/commons/CommunitySidebar";

function UpdateReport() {
    return (
        <div style={{ display: "flex", flex: 1, margin: "20px 100px" }}>
            <CommunitySidebar />
            <ReportUpdateForm />
        </div>
    );
}

export default UpdateReport;