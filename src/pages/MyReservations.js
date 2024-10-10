import MyPageSidebar from "../components/commons/MyPageSidebar";
import MyReservationsForm from "../components/forms/MyReservationsForm";

function MyReservations() {
    return (
        <div style={{ display: "flex", margin: "20px 100px", flex: 1 }}>
            <MyPageSidebar />
            <MyReservationsForm />
        </div>
    );
}

export default MyReservations;