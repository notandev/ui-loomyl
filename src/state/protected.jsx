import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ element }) => {
    const { isLoggedIn, isLoading } = useAuth();
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    return isLoggedIn ? element : <Navigate to="/login" />;
  };
  

export default ProtectedRoute;