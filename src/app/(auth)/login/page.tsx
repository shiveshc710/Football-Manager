"use client";

import { useState } from "react";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { TextField, InputAdornment, IconButton } from "@mui/material";

import "./login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <h1 className="fm-heading">Football Manager</h1>
      <h2 className="login-heading">Sign In</h2>

      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <TextField
          className="text-field"
          variant="filled"
          label="Email"
          type="email"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon className="icon" />
              </InputAdornment>
            ),
          }}
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiFilledInput-root": { color: "white" },
          }}
        />

        <TextField
          className="text-field"
          variant="filled"
          label="Password"
          type={showPassword ? "text" : "password"}
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon className="icon" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  className="icon-button"
                  aria-label="toggle password visibility"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            input: { color: "white" },
            label: { color: "white" },
            "& .MuiFilledInput-root": { color: "white" },
          }}
        />

        <div className="sign-up-row">
          <span className="sign-up-text">Don't have an account?</span>
          <Link href="/signup" legacyBehavior>
            <a className="sign-up-link">Sign Up</a>
          </Link>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}
