import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { MainWrapper } from "../assets/wrappers/SignInWrapper";
import { useAppContext } from "../context/appContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { setUserState } = useAppContext();
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/signup", {
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
            <h1>Sign up</h1>
            <h2>Registered users get to save and view their usage history!</h2>
          </hgroup>
          <form onSubmit={signUpHandler}>
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
                Already registered? <Link to="/login">Login</Link>
              </label>
            </fieldset>
            <button type="submit" className="contrast">
              Sign Up
            </button>
          </form>
        </div>
      </article>
    </MainWrapper>
  );
};
export default SignUp;
