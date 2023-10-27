import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MainWrapper, SigninFieldset } from "../assets/wrappers/SignInWrapper";
import { useAppContext } from "../context/appContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { userEmail, signUpUser } = useAppContext();
  const [userInfo, setUserInfo] = useState({
    email: "",
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
    if (userEmail) {
      navigate("/");
    }
  }, [userEmail, navigate]);

  return (
    <MainWrapper className="container">
      <article>
        <hgroup>
          <h1>Sign up</h1>
          <h2>Registered users get to save and view their usage history!</h2>
        </hgroup>
        <form onSubmit={signUpHandler}>
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
          <SigninFieldset>
            <label>
              Already registered? <Link to="/login">Login</Link>
            </label>
          </SigninFieldset>
          <button type="submit" className="contrast">
            Sign Up
          </button>
        </form>
      </article>
    </MainWrapper>
  );
};
export default SignUp;
