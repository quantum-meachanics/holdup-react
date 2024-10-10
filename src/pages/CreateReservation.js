import CommunitySidebar from "../components/commons/CommunitySidebar";
import CreateReservationForm from "../components/forms/CreateReservationForm";

function CreateReservation() {
    return (
        <div style={{ display: "flex", margin: "20px 100px", flex: 1 }}>
            <CommunitySidebar />
            <CreateReservationForm />
        </div>
    );
}

export default CreateReservation;