import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/SignInForm";
import axios from "axios";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

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
      const { data } = await axios.post("/auth/login", {
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
    <Wrapper className="container">
      <article className="grid">
        <div>
          <hgroup>
            <h1>Sign in</h1>
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
            <fieldset>
              <label htmlFor="remember">
                Not registered? <Link to="/register">Sign Up</Link>
              </label>
            </fieldset>
            <button type="submit" className="contrast">
              Login
            </button>
          </form>
        </div>
      </article>
    </Wrapper>
  );
};

export default Login;
