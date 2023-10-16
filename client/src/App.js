import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LandingLayout,
  Landing,
  Login,
  SignUp,
  User,
  UserSettings,
  UserHistory,
  Admin,
  Error,
  AddCipherTab,
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
            <Route path="user" element={<User />}>
              <Route index element={<UserSettings />} />
              <Route path="history" element={<UserHistory />} />
            </Route>
            <Route path="admin" element={<Admin />}>
              <Route index element={<CiphersTab />} />
              <Route path="users" element={<UsersTab />} />
              <Route path="addCipher" element={<AddCipherTab />} />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
