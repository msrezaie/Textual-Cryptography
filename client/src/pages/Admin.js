import { AddCipher, CiphersTable } from "../components";
import { MainWrapper } from "../assets/wrappers/AdminWrapper";

const Admin = () => {
  return (
    <>
      <MainWrapper className="container">
        <CiphersTable />
        <AddCipher />
      </MainWrapper>
    </>
  );
};

export default Admin;
