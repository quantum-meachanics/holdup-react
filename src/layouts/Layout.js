import { Outlet } from "react-router-dom";
import Footer from "../components/commons/Footer";
import Header from '../components/commons/Header';
import style from '../css/Layout.module.css';

function Layout() {
    return (
        <>
            <Header />
            <div className={style.outlet}><Outlet /></div>
            <Footer />
        </>
    );
}

export default Layout;