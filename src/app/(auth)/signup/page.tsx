"use client";

import "../../../app/globals.css";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState, useEffect, lazy, Suspense } from "react";
import Head from "next/head";
import { SignUpAPI } from "@/utils/api/signupapi";

import "./signup.css";

const Alert = lazy(() => import("@/components/Alert/alert"));

export const dynamic = "force-dynamic";

export default function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    phoneNumber: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [passwordConfig, setPasswordConfig] = useState({
    confirmPassword: "",
    passwordMatch: true,
    passwordHidden: true,
  });

  const [alert, setAlert] = useState({
    alertName: "",
    alertMessage: "",
  });

  const [signupTriggered, setSignupTriggered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });

    if (name === "confirmPassword") {
      setPasswordConfig({
        ...passwordConfig,
        confirmPassword: value,
        passwordMatch: value === userDetails.password,
        passwordHidden: false,
      });
    }
    if (name === "password") {
      setPasswordConfig({
        ...passwordConfig,
        passwordMatch: value === passwordConfig.confirmPassword,
        passwordHidden: false,
      });
    }
  };

  const handleSignup = () => {
    setSignupTriggered(true);
  };

  useEffect(() => {
    const signUp = async () => {
      if (!signupTriggered) return;

      try {
        setIsLoading(true);
        setButtonDisabled(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await SignUpAPI(
          userDetails.email,
          userDetails.password,
          userDetails.dob,
          userDetails.name,
          userDetails.lastName,
          userDetails.phoneNumber
        );

        if (response && response.status === 200) {
          setAlert({
            alertName: "Success",
            alertMessage: "Account Created Successfully",
          });
        } else {
          setAlert({
            alertName: "Error",
            alertMessage: "Account Creation Failed",
          });
        }
      } catch (error) {
        setAlert({
          alertName: "Error",
          alertMessage: "Account Creation Failed",
        });
        console.log(error);
      } finally {
        setTimeout(() => {
          setAlert({
            alertName: "",
            alertMessage: "",
          });
        }, 5000);

        setButtonDisabled(false);
        setSignupTriggered(false);
        setIsLoading(false);
      }
    };

    if (
      userDetails.email &&
      userDetails.password &&
      userDetails.dob &&
      userDetails.name &&
      userDetails.lastName &&
      userDetails.phoneNumber
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    signUp();
  }, [signupTriggered, userDetails]);

  return (
    <>
      <Head>
        <title>Football Manager | Sign Up</title>
      </Head>
      <div className="signup-container">
        <h1 className="fm-heading">Football Manager</h1>
        <h2 className="login-heading">Sign Up</h2>

        {alert.alertName && (
          <Suspense>
            <Alert name={alert.alertName} message={alert.alertMessage} />
          </Suspense>
        )}

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div className="login-row">
            <label className="label">Email:</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              className="login-input"
              placeholder="Enter your Email"
              onChange={handleFormChange}
              required
            />
          </div>

          {/* Name */}
          <div className="login-row">
            <label className="label">Name:</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              className="login-input"
              placeholder="Enter your Name"
              onChange={handleFormChange}
              required
            />
          </div>

          {/* Last Name */}
          <div className="login-row">
            <label className="label">Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              className="login-input"
              placeholder="Enter your Last Name"
              onChange={handleFormChange}
              required
            />
          </div>

          {/* DOB */}
          <div className="login-row">
            <label className="label">DOB:</label>
            <input
              type="date"
              name="dob"
              value={userDetails.dob}
              className="login-input"
              onChange={handleFormChange}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="login-row">
            <label className="label">Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              className="login-input"
              value={userDetails.phoneNumber}
              onChange={handleFormChange}
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

          {/* Password */}
          <div className="login-row relative">
            <label className="label">Password:</label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className="login-input pr-10"
              value={userDetails.password}
              onChange={handleFormChange}
              placeholder="Enter your Password"
              required
            />
            <button
              type="button"
              className="eye-button"
              onClick={toggleVisibility}
              aria-label="Toggle password visibility"
            >
              {passwordVisible ? <Eye /> : <EyeOff />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="login-row relative">
            <label className="label">Confirm Password:</label>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={passwordConfig.confirmPassword}
              className="login-input pr-10"
              placeholder="Confirm your Password"
              onChange={handleFormChange}
              required
            />
            <button
              type="button"
              className="eye-button"
              onClick={toggleConfirmVisibility}
              aria-label="Toggle confirm password visibility"
            >
              {confirmPasswordVisible ? <Eye /> : <EyeOff />}
            </button>
          </div>

          {/* Password match message */}
          <div className="login-row">
            {passwordConfig.passwordMatch ? (
              <span
                className="text-green-500 ml-[9rem] text-sm"
                hidden={passwordConfig.passwordHidden}
              >
                Passwords match
              </span>
            ) : (
              <span className="text-red-500 ml-[9rem] text-sm">
                Passwords do not match
              </span>
            )}
          </div>

          {/* Link to Login */}
          <div className="login-row">
            <p className="mt-5 mr-[9rem]">Already have an account?</p>
            <Link href="/login" legacyBehavior>
              <a className="signup-link mt-5">Sign In</a>
            </Link>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="login-button"
            disabled={buttonDisabled || isLoading}
            onClick={handleSignup}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
}
