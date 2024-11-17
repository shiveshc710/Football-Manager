"use client";
import "../../../app/globals.css";
import LoginBackground from "@/components/background/loginBackground";
import "../login/login.css";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import "./signup.css";

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <div className="signup-background">
        <LoginBackground />

        <div className="login-container">
          <h1 className="fm-heading">Football Manager</h1>
          <div className="box-section">
            <h2 className="login-heading">Sign Up</h2>
            <form className="login-form">
              {/* Email Section  */}
              <div className="login-row">
                <label className="w-36">Email:</label>
                <input
                  type="email"
                  className="login-input"
                  placeholder="Enter your Email"
                  required
                />
              </div>

              {/* Name Section */}
              <div className="login-row">
                <label className="w-36">Name:</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Enter your Name"
                  required
                />
              </div>
              {/* Last Name Section */}
              <div className="login-row">
                <label className="w-36">Last Name:</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Enter your Last Name"
                  required
                />
              </div>

              {/* DOB Section */}
              <div className="login-row">
                <label className="w-36">DOB:</label>
                <input type="date" className="login-input" required />
              </div>

              {/* Phone Number Section */}
              <div className="login-row">
                <label className="w-36">Phone Number:</label>
                <input
                  type="text"
                  className="login-input"
                  placeholder="Enter your Phone Number"
                  pattern="\d{10}"
                  title="Phone number must be 10 digits"
                  onInvalid={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity("Phone number must be 10 digits");
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.setCustomValidity("");
                  }}
                  required
                />
              </div>

              {/* Password Section */}
              <div className="login-row">
                <label className="w-36">Password:</label>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className="login-input"
                  placeholder="Enter your Password"
                  required
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={toggleVisibility}
                >
                  {passwordVisible ? <Eye /> : <EyeOff />}
                </button>
              </div>

              {/* Confirm Password Section */}
              <div className="login-row">
                <label className="w-36">Confirm Password:</label>
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  className="login-input"
                  placeholder="Confirm your Password"
                  required
                />
                <button
                  type="button"
                  className="eye-button"
                  onClick={toggleConfirmVisibility}
                >
                  {confirmPasswordVisible ? <Eye /> : <EyeOff />}
                </button>
              </div>

              {/* Link Section */}
              <div className="login-row">
                <p className="mt-5 mr-40">Already have an account?</p>
                <Link href="/login" className="signup-link mt-5">
                  Sign In
                </Link>
              </div>
              {/* Button Section */}
              <button className="button">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
