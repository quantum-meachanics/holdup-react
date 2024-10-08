import { Outlet } from "react-router-dom";
import Footer from "../components/commons/Footer";
import Header from '../components/commons/Header';

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;