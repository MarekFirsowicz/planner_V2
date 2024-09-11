import { NavLink, Outlet} from "react-router-dom";


const AdminLayout = () => {
    
    return (
        <div className="admin-layout">
            <header>
                <nav>
                    <NavLink to='/admin/'><i className="fa-solid fa-person"></i></NavLink>
                    <NavLink to='/admin/calendar'><i className="fa-sharp fa-solid fa-calendar"></i></NavLink>
                    <NavLink to='/admin/contract'><i className="fa-solid fa-warehouse"></i></NavLink>
                    <NavLink to='/admin/shiftPattern'><i className="fa-solid fa-calendar-week"></i></NavLink>
                    <NavLink to='/admin/user'><i className="fa-solid fa-users"></i></NavLink>                    
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    );
}

export default AdminLayout;