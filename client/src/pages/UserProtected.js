import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const UserProtected = ({ children }) => {
  const { role } = useAppContext();
  if (role === "user") {
    return children;
  }
  return <Navigate to="/" />;
};

export default UserProtected;
