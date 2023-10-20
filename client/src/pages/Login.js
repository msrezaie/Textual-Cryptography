import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { MainWrapper, LoginFieldset } from "../assets/wrappers/SignInWrapper";

const Login = () => {
  const navigate = useNavigate();
  const { userEmail, loginUser } = useAppContext();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      loginUser(userInfo);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (userEmail) {
      navigate("/");
    }
  }, [userEmail, navigate]);

  return (
    <MainWrapper className="container">
      <article className="grid">
        <div>
          <hgroup>
            <h1>Login</h1>
            <h2>Login to save your usage history!</h2>
          </hgroup>
          <form onSubmit={loginHandler}>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              placeholder="Email"
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
            <LoginFieldset>
              <ul>
                <li>
                  <label>
                    Not registered? <Link to="/signup">Sign Up</Link>
                  </label>
                </li>
                <li>
                  <label>
                    <Link onClick={() => toast.info("not yet implemented!")}>
                      Forgot Password?
                    </Link>
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
