import CommunitySidebar from "../components/commons/CommunitySidebar";
import CreateReportForm from "../components/forms/CreateReportForm";

function CreateReport() {
    return (
        <div style={{ display: "flex", flex: 1, margin: "20px 100px" }}>
            <CommunitySidebar />
            <CreateReportForm />
        </div>
    );
}

export default CreateReport;