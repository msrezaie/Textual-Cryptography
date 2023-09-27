import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

const LandingLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default LandingLayout;
