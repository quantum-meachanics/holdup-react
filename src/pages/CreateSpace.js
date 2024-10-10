import CommunitySidebar from "../components/commons/CommunitySidebar";
import CreateSpaceForm from "../components/forms/CreateSpaceForm";

function CreateSpace() {
    return (
        <div style={{display: "flex", margin: "20px 100px", flex: 1}}>
            <CommunitySidebar />
            <CreateSpaceForm />
        </div>
    );
}

export default CreateSpace;