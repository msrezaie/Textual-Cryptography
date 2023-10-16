import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const UserProtected = ({ children }) => {
  const { userName } = useAppContext();
  if (userName) {
    return children;
  }
  return <Navigate to="/" />;
};

export default UserProtected;
