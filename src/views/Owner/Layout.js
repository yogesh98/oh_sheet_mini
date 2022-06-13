import Navs from "containers/Navbar/Navs";
import { Outlet } from "react-router-dom";

export default function Layout() {

    return (
        <div className="d-flex flex-column h-100">
            <div className="mb-2">
                <Navs />        
            </div>
            <Outlet />
        </div>
    )
}