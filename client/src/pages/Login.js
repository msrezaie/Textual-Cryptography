import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { MainWrapper, LoginFieldset } from "../assets/wrappers/SignInWrapper";

const Login = () => {
  const navigate = useNavigate();
  const { setUserState } = useAppContext();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const signInHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        name: user.name,
        password: user.password,
      });
      setUserState({ user: data.name, isAdmin: data.isAdmin });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <MainWrapper className="container">
      <article className="grid">
        <div>
          <hgroup>
            <h1>Login</h1>
            <h2>Login to save your usage history!</h2>
          </hgroup>
          <form onSubmit={signInHandler}>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Name"
              required
            />
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              required
            />
            <LoginFieldset>
              <ul>
                <li>
                  <label>
                    Not registered? <Link to="/signup">Sign Up</Link>
                  </label>
                </li>
              </ul>
            </LoginFieldset>
            <button type="submit" className="contrast">
              Login
            </button>
          </form>
        </div>
      </article>
    </MainWrapper>
  );
};

export default Login;
