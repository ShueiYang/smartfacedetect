import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ login, children }) => {

    if(login) {
        return children;
    }
    return <Navigate to='/signin' />
};

export default ProtectedRoute;