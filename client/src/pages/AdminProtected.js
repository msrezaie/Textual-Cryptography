import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const { isAdmin } = useAppContext();
  if (isAdmin) {
    return children;
  }
  return <Navigate to="/" />;
};

export default AdminProtected;
