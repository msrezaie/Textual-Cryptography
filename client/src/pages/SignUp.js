import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MainWrapper } from "../assets/wrappers/SignInWrapper";
import { useAppContext } from "../context/appContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { userName, signUpUser } = useAppContext();
  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
  });

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      signUpUser(userInfo);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (userName) {
      navigate("/");
    }
  }, [userName, navigate]);

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
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              placeholder="Name"
              required
            />
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
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
