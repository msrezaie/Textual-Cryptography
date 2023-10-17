import { Outlet } from "react-router-dom";
import { SideBarNav } from "../components";
import { MainWrapper, SideNavWrapper } from "../assets/wrappers/ProfileWrapper";
import userLinks from "../util/userNavLinks";
import UserProtected from "./UserProtected";

const UserLayout = () => {
  return (
    <>
      <MainWrapper>
        <UserProtected>
          <SideNavWrapper>
            <div className="sidebar show-sidebar">
              <SideBarNav links={userLinks} />
            </div>
          </SideNavWrapper>
          <div className="pages">
            <Outlet />
          </div>
        </UserProtected>
      </MainWrapper>
    </>
  );
};
export default UserLayout;
