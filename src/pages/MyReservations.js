import MyPageSidebar from "../components/commons/MyPageSidebar";
import MyReservationsForm from "../components/forms/MyReservationsForm";

function MyReservations() {
    return (
        <div style={{ display: "flex" }}>
            <MyPageSidebar />
            <MyReservationsForm />
        </div>
    );
}

export default MyReservations;