import ReportDetailForm from "../components/forms/ReportDetailForm"
import ReportCommentForm from "../components/forms/ReportCommentForm"
import CreateReportCommentForm from "../components/forms/CreateReportCommentForm"

function ReportDetail() {
    return(
        <>
            <ReportDetailForm/>
            <CreateReportCommentForm/>
            <ReportCommentForm/>
        </>
    )
}

export default ReportDetail