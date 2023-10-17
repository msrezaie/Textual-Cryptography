import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const UserProtected = ({ children }) => {
  const { userEmail } = useAppContext();
  if (userEmail) {
    return children;
  }
  return <Navigate to="/" />;
};

export default UserProtected;
