import { AddCipher, CiphersTable } from "../components";
import { MainWrapper } from "../assets/wrappers/AdminWrapper";

const Admin = () => {
  return (
    <>
      <MainWrapper className="container">
        <div className="container">
          <CiphersTable />
          <AddCipher />
        </div>
      </MainWrapper>
    </>
  );
};

export default Admin;
