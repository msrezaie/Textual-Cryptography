import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/SignInForm";

const Register = () => {
  return (
    <Wrapper className="container">
      <article className="grid">
        <div>
          <hgroup>
            <h1>Sign up</h1>
            <h2>Registered users get to save and view their usage history!</h2>
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
                Already registered? <Link to="/login">Login</Link>
              </label>
            </fieldset>
            <button
              type="submit"
              className="contrast"
              onClick={(e) => toast.info("Not implemented yet!")}
            >
              Register
            </button>
          </form>
        </div>
      </article>
    </Wrapper>
  );
};
export default Register;
