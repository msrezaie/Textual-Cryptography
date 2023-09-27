import { AddCipher, MethodsTable } from "../components";
import AdminWrapper from "../assets/wrappers/AdminWrapper";

const Admin = () => {
  return (
    <>
      <AdminWrapper className="container">
        <header>
          <strong>Admin Operations</strong>
        </header>
        <div className="container">
          <MethodsTable />
          <AddCipher />
        </div>
      </AdminWrapper>
    </>
  );
};
export default Admin;
