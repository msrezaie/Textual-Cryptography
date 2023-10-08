import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { MainWrapper, LoginFieldset } from "../assets/wrappers/SignInWrapper";

const Login = () => {
  const navigate = useNavigate();
  const { userName, loginUser } = useAppContext();
  const [userInfo, setUserInfo] = useState({
    name: "",
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
    if (userName) {
      navigate("/");
    }
  }, [userName, navigate]);

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
