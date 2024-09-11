import { useRouteError, Link} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();
    
    return (
        <div>
            <h2>Error</h2>
            <p>{error.message}</p>
            <button><Link to='/'>Home</Link></button>
        </div>
    );
}

export default ErrorPage;