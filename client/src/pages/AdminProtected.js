import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const { role } = useAppContext();
  if (role && role !== "user") {
    return children;
  }
  return <Navigate to="/" />;
};

export default AdminProtected;
