import { AddCipher, CiphersTable, UsersTable } from "../components";
import AdminWrapper from "../assets/wrappers/AdminWrapper";

const Admin = () => {
  return (
    <>
      <AdminWrapper className="container">
        <header>
          <strong>Admin Operations</strong>
        </header>
        <div className="grid">
          <UsersTable />
          <CiphersTable />
        </div>
        <div className="container">
          <AddCipher />
        </div>
      </AdminWrapper>
    </>
  );
};

export default Admin;
