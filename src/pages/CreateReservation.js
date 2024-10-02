import CommunitySidebar from "../components/commons/CommunitySidebar";
import CreateReservationForm from "../components/forms/CreateReservationForm";

function CreateReservation() {
    return (
        <div style={{ display: "flex" }}>
            <CommunitySidebar />
            <CreateReservationForm />
        </div>
    );
}

export default CreateReservation;