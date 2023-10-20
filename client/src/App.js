import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LandingLayout,
  Landing,
  Login,
  SignUp,
  UserLayout,
  UserSettings,
  UserHistory,
  AdminLayout,
  Error,
  AddCipherTab,
  ModifyCipherTab,
  CiphersTab,
  UsersTab,
} from "./pages";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingLayout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="user" element={<UserLayout />}>
              <Route index element={<UserSettings />} />
              <Route path="history" element={<UserHistory />} />
            </Route>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<CiphersTab />} />
              <Route path="users" element={<UsersTab />} />
              <Route path="addCipher" element={<AddCipherTab />} />
              <Route path="modifyCipher" element={<ModifyCipherTab />} />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
