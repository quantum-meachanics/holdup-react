import CommunitySidebar from "../components/commons/CommunitySidebar";
import SpacePage from "../components/forms/SpacePage";

function Spaces() {
    return (
        <div style={{ display: "flex" }}>
            <CommunitySidebar />
            <SpacePage />
        </div>
    );
}

export default Spaces;