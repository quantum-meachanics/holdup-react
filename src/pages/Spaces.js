import CommunitySidebar from "../components/commons/CommunitySidebar";
import SpacePage from "../components/forms/SpacePage";

function Spaces() {
    return (
        <div style={{ display: "flex", margin: "20px 100px", flex: 1 }}>
            <CommunitySidebar />
            <SpacePage />
        </div>
    );
}

export default Spaces;