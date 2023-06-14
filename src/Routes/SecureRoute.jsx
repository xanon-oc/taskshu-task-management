import { useContext } from "react";
import { AuthContext } from "../AuthProviders/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader";

const SecureRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);
  if (loading) {
    return (
      <div className="flex justify-center h-[calc(100vh-250px)] place-items-center">
        <Loader />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default SecureRoute;
