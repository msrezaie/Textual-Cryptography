import { toast } from "react-toastify";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAppContext();
  if (isAdmin) {
    return children;
  }
  toast.warn("admin access required!");
  return <Navigate to="/login" />;
};
export default ProtectedRoute;
