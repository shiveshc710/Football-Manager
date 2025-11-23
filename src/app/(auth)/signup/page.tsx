"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import CakeIcon from "@mui/icons-material/Cake";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SportsIcon from "@mui/icons-material/Sports";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { SignUpAPI } from "@/utils/api/signupapi";

import "./signup.css";

// Zod validation schema
const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    name: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      console.log("Signup attempt:", data);
      const response = await SignUpAPI(
        data.email,
        data.password,
        data.dateOfBirth,
        data.name,
        data.lastName,
        data.phoneNumber
      );

      if (response && response.status === 200) {
        console.log("Account created successfully!");
        // TODO: Redirect to login or show success message
      }
    } catch (error) {
      console.error("Signup failed:", error);
      // TODO: Show error message
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        {/* Header with Football Icon */}
        <div className="signup-header">
          <div className="icon-wrapper">
            <SportsIcon className="football-icon" />
          </div>
          <h1 className="fm-heading">Football Manager</h1>
          <p className="fm-subtitle">Create Your Account</p>
        </div>

        <h2 className="signup-heading">Join the Team</h2>

        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <TextField
              {...register("name")}
              className="text-field"
              variant="outlined"
              label="First Name"
              type="text"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon className="input-icon" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: errors.name ? "#ef4444" : "#d1d5db",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.name ? "#ef4444" : "#9ca3af",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.name ? "#ef4444" : "#1f2937",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: errors.name ? "#ef4444" : "#6b7280",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: errors.name ? "#ef4444" : "#1f2937",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ef4444",
                  marginLeft: 0,
                },
              }}
            />

            <TextField
              {...register("lastName")}
              className="text-field"
              variant="outlined"
              label="Last Name"
              type="text"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon className="input-icon" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: errors.lastName ? "#ef4444" : "#d1d5db",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.lastName ? "#ef4444" : "#9ca3af",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.lastName ? "#ef4444" : "#1f2937",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: errors.lastName ? "#ef4444" : "#6b7280",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: errors.lastName ? "#ef4444" : "#1f2937",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ef4444",
                  marginLeft: 0,
                },
              }}
            />
          </div>

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

          <div className="form-row">
            <TextField
              {...register("phoneNumber")}
              className="text-field"
              variant="outlined"
              label="Phone Number"
              type="tel"
              fullWidth
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon className="input-icon" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: errors.phoneNumber ? "#ef4444" : "#d1d5db",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.phoneNumber ? "#ef4444" : "#9ca3af",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.phoneNumber ? "#ef4444" : "#1f2937",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: errors.phoneNumber ? "#ef4444" : "#6b7280",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: errors.phoneNumber ? "#ef4444" : "#1f2937",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ef4444",
                  marginLeft: 0,
                },
              }}
            />

            <TextField
              {...register("dateOfBirth")}
              className="text-field"
              variant="outlined"
              label="Date of Birth"
              type="date"
              fullWidth
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth?.message}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeIcon className="input-icon" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: errors.dateOfBirth ? "#ef4444" : "#d1d5db",
                  },
                  "&:hover fieldset": {
                    borderColor: errors.dateOfBirth ? "#ef4444" : "#9ca3af",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: errors.dateOfBirth ? "#ef4444" : "#1f2937",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: errors.dateOfBirth ? "#ef4444" : "#6b7280",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: errors.dateOfBirth ? "#ef4444" : "#1f2937",
                },
                "& .MuiFormHelperText-root": {
                  color: "#ef4444",
                  marginLeft: 0,
                },
              }}
            />
          </div>

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

          <TextField
            {...register("confirmPassword")}
            className="text-field"
            variant="outlined"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon className="input-icon" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    edge="end"
                    className="icon-button"
                    aria-label="toggle confirm password visibility"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
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
                  borderColor: errors.confirmPassword ? "#ef4444" : "#d1d5db",
                },
                "&:hover fieldset": {
                  borderColor: errors.confirmPassword ? "#ef4444" : "#9ca3af",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.confirmPassword ? "#ef4444" : "#1f2937",
                },
              },
              "& .MuiInputLabel-root": {
                color: errors.confirmPassword ? "#ef4444" : "#6b7280",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: errors.confirmPassword ? "#ef4444" : "#1f2937",
              },
              "& .MuiFormHelperText-root": {
                color: "#ef4444",
                marginLeft: 0,
              },
            }}
          />

          <button
            type="submit"
            className="signup-button"
            disabled={isSubmitting}
          >
            <span className="button-text">
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </span>
            <div className="button-shine"></div>
          </button>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">or</span>
            <span className="divider-line"></span>
          </div>

          <div className="signin-row">
            <span className="signin-text">Already have an account?</span>
            <Link href="/login" legacyBehavior>
              <a className="signin-link">Sign In</a>
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
