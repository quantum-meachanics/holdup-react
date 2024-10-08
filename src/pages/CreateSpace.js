import CommunitySidebar from "../components/commons/CommunitySidebar";
import CreateSpaceForm from "../components/forms/CreateSpaceForm";

function CreateSpace() {
    return (
        <div style={{ display: "flex", width: "100%" }}>
            <CommunitySidebar />
            <div style={{ flex: 1 }}>
                <CreateSpaceForm />
            </div>
        </div>
    );
}

export default CreateSpace;