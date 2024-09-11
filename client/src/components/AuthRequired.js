import { useLocation, Navigate, Outlet } from "react-router-dom";


const AuthRequired = ({access}) => {
    const location = useLocation()

    const user = JSON.parse(localStorage.getItem("user")) || null
    return ( 
        user?.accessLvl >= access
            ? <Outlet />
            : user
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
     );
}
 
export default AuthRequired;