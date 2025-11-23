"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SportsIcon from "@mui/icons-material/Sports";
import { TextField, InputAdornment, IconButton, Alert } from "@mui/material";
import { authAPI } from "@/utils/api/authApi";

import "./login.css";

// Zod validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError(null);

      // Call login API
      const response = await authAPI.login({
        emailId: data.email,
        password: data.password,
      });

      // Store token
      authAPI.setToken(response.token);

      // Store user data in localStorage
      localStorage.setItem('user_data', JSON.stringify({
        userId: response.userId,
        name: response.name,
        lastName: response.lastName,
        emailId: response.emailId,
      }));

      // Redirect to welcome page
      router.push('/welcome');
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.response?.status === 401) {
        setLoginError("Invalid email or password");
      } else {
        setLoginError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Header with Football Icon */}
        <div className="login-header">
          <div className="icon-wrapper">
            <SportsIcon className="football-icon" />
          </div>
          <h1 className="fm-heading">Football Manager</h1>
          <p className="fm-subtitle">Manage Your Dream Team</p>
        </div>

        <h2 className="login-heading">Welcome Back</h2>

        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}

        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("email")}
            className="text-field"
            variant="outlined"
            label="Email Address"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon className="input-icon" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: errors.email ? "#ef4444" : "#d1d5db",
                },
                "&:hover fieldset": {
                  borderColor: errors.email ? "#ef4444" : "#9ca3af",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.email ? "#ef4444" : "#1f2937",
                },
              },
              "& .MuiInputLabel-root": {
                color: errors.email ? "#ef4444" : "#6b7280",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: errors.email ? "#ef4444" : "#1f2937",
              },
              "& .MuiFormHelperText-root": {
                color: "#ef4444",
                marginLeft: 0,
              },
            }}
          />

          <TextField
            {...register("password")}
            className="text-field"
            variant="outlined"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className="input-icon" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    className="icon-button"
                    aria-label="toggle password visibility"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <VisibilityOff className="input-icon" />
                    ) : (
                      <Visibility className="input-icon" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                "& fieldset": {
                  borderColor: errors.password ? "#ef4444" : "#d1d5db",
                },
                "&:hover fieldset": {
                  borderColor: errors.password ? "#ef4444" : "#9ca3af",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.password ? "#ef4444" : "#1f2937",
                },
              },
              "& .MuiInputLabel-root": {
                color: errors.password ? "#ef4444" : "#6b7280",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: errors.password ? "#ef4444" : "#1f2937",
              },
              "& .MuiFormHelperText-root": {
                color: "#ef4444",
                marginLeft: 0,
              },
            }}
          />

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            <span className="button-text">
              {isSubmitting ? "Signing In..." : "Sign In"}
            </span>
            <div className="button-shine"></div>
          </button>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">or</span>
            <span className="divider-line"></span>
          </div>

          <div className="sign-up-row">
            <span className="sign-up-text">Don&apos;t have an account?</span>
            <Link href="/signup" legacyBehavior>
              <a className="sign-up-link">Create Account</a>
            </Link>
          </div>
        </form>

        {/* Decorative Elements */}
        <div className="field-lines"></div>
      </div>

      {/* Background Decorations */}
      <div className="bg-decoration bg-decoration-1"></div>
      <div className="bg-decoration bg-decoration-2"></div>
    </div>
  );
}
