import ReportDetailForm from "../components/forms/ReportDetailForm"
import ReportCommentForm from "../components/forms/ReportCommentForm"
import CreateReportCommentForm from "../components/forms/CreateReportCommentForm"
import CommunitySidebar from "../components/commons/CommunitySidebar"

function ReportDetail() {
    return (
        <div style={{ display: "flex", flex: 1, margin: "20px 100px" }}>
            <CommunitySidebar />
            <div style={{ display: "flex", flexDirection: "column" }}>
                <ReportDetailForm />
                <CreateReportCommentForm />
                <ReportCommentForm />
            </div>
        </div>
    )
}

export default ReportDetail