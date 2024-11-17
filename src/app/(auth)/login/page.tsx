import "./login.css";
import "../../globals.css";
import Link from "next/link";
import LoginBackground from "../../../components/background/loginBackground";

export default function Login() {
  return (
    <>
      <div className="login-background">
        <LoginBackground />

        <div className="login-container">
          <h1 className="fm-heading">Football Manager</h1>
          <div className="box-section">
            <h2 className="login-heading">Sign In</h2>
            <form className="login-form">
              {/* Email Section  */}
              <div className="login-row">
                <label className="w-36">Email:</label>
                <input
                  type="email"
                  className="login-input"
                  placeholder="Enter your Email"
                />
              </div>

              {/* Password Section */}
              <div className="login-row">
                <label className="w-36">Password:</label>
                <input
                  type="password"
                  className="login-input"
                  placeholder="Enter your Password"
                />
              </div>

              {/* Sign Up Section */}
              <div className="login-row">
                <label className="w-55 mr-40">Don't have an account?</label>
                <Link href="/signup" className="signup-link">
                  Sign Up
                </Link>
              </div>

              {/* Button Section */}
              <button type="submit" className="button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
