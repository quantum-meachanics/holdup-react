import CommunitySidebar from "../components/commons/CommunitySidebar";
import SpaceDetailForm from "../components/forms/SpaceDetailForm";

function SpaceDetail() {
    return (
        <div style={{ display: "flex", margin: "20px 100px", flex: 1 }}>
            <CommunitySidebar />
            <SpaceDetailForm />
        </div>
    );
}

export default SpaceDetail;