import CommunitySidebar from "../components/commons/CommunitySidebar";
import CreateSpaceForm from "../components/forms/CreateSpaceForm";

function CreateSpace() {
    return (
        <div style={{display: "flex"}}>
            <CommunitySidebar />
            <CreateSpaceForm />
        </div>
    );
}

export default CreateSpace;