import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import { AnchorBtn, MainWrapper } from "../assets/wrappers/SignInWrapper";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { userEmail } = useAppContext();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpReceived, setOtpReceived] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const confirmEmail = async () => {
    try {
      const response = await axios.post("/api/v1/user/sendOTP", { email });
      if (response.status === 200) {
        setEmailSent(true);
        toast.info(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const resendOTP = async () => {
    try {
      setOtp("");
      const response = await axios.post("/api/v1/user/sendOTP", { email });
      if (response.status === 200) {
        toast.info(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const validateOTP = async () => {
    try {
      const response = await axios.post("/api/v1/user/validateOTP", {
        email,
        otp,
      });
      if (response.status === 200) {
        setOtp("");
        setEmailSent(false);
        setOtpReceived(response.data.otp);
        toast.success("Email verified successfully!");
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const resetPassword = async () => {
    try {
      const response = await axios.patch(
        `/api/v1/user/resetPassword/${email}`,
        {
          otp: otpReceived,
          newPassword,
        }
      );
      if (response.status === 200) {
        navigate("/login");
        toast.success("Password reset successfully!");
      }
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
          {emailSent && (
            <>
              <hgroup>
                <h1>Enter OTP</h1>
                <h2>
                  We've sent a One Time Password (OTP) to the email {email}.
                  Please enter it below:
                </h2>
              </hgroup>
              <input
                value={otp}
                maxLength="6"
                autoFocus={true}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                disabled={otp.length < 6}
                className="contrast"
                onClick={validateOTP}
              >
                Verify
              </button>
              <AnchorBtn>
                <button className="a-btn" onClick={resendOTP}>
                  Resend OTP
                </button>
              </AnchorBtn>
            </>
          )}
          {otpReceived && (
            <>
              <hgroup>
                <h1>Reset Password</h1>
                <h2>Enter a new password:</h2>
              </hgroup>
              <input
                type="password"
                value={newPassword}
                autoFocus={true}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button onClick={resetPassword} className="contrast">
                Reset
              </button>
            </>
          )}
          {!emailSent && !otpReceived && (
            <>
              <hgroup>
                <h1>Verify Identity</h1>
                <h2>Enter your registered user email:</h2>
              </hgroup>
              <input
                type="email"
                name="email"
                value={email}
                autoFocus={true}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
              <button onClick={confirmEmail} className="contrast">
                Continue
              </button>
            </>
          )}
        </div>
      </article>
    </MainWrapper>
  );
};

export default ResetPassword;
