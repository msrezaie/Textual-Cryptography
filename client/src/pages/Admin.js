import { AddCipher, CiphersTable, UsersTable } from "../components";
import { MainWrapper } from "../assets/wrappers/AdminWrapper";

const Admin = () => {
  return (
    <>
      <MainWrapper className="container">
        <div className="grid">
          <div className="container">
            <CiphersTable />
          </div>
          <div className="container">
            <UsersTable />
          </div>
        </div>
        <div className="container">
          <AddCipher />
        </div>
      </MainWrapper>
    </>
  );
};

export default Admin;
