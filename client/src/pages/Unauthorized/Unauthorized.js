import { Link } from "react-router-dom";
const Unauthorized = () => {
    const handleLogout=()=>{
        localStorage.removeItem('user')
    }
    return ( 
        <div>
            <h2>Sorry</h2>
            <p>You are not to authorized to access this Page</p>
            <Link onClick={handleLogout} to="/">Back to Home Page</Link>
        </div>
     );
}
 
export default Unauthorized;