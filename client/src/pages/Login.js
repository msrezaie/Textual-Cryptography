import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/SignInForm";

const Login = () => {
  return (
    <Wrapper className="container">
      <article className="grid">
        <div>
          <hgroup>
            <h1>Sign in</h1>
            <h2>Login to save your usage history!</h2>
          </hgroup>
          <form>
            <input
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Email"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              autocomplete="current-password"
              required
            />
            <fieldset>
              <label htmlFor="remember">
                Not registered? <Link to="/register">Sign Up</Link>
              </label>
            </fieldset>
            <button
              type="submit"
              className="contrast"
              onClick={(e) => toast.info("Not implemented yet!")}
            >
              Login
            </button>
          </form>
        </div>
      </article>
    </Wrapper>
  );
};

export default Login;
