"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/utils/api/authApi";
import SportsIcon from "@mui/icons-material/Sports";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import "./welcome.css";

interface UserData {
    userId: number;
    name: string;
    lastName: string;
    emailId: string;
}

export default function Welcome() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [tokenExpiry, setTokenExpiry] = useState<number>(20);
    const router = useRouter();

    useEffect(() => {
        // Check if user is authenticated
        if (!authAPI.isAuthenticated()) {
            router.push("/login");
            return;
        }

        // Get user data from localStorage
        const storedUserData = localStorage.getItem("user_data");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }

        // Start countdown timer for token expiration (20 seconds)
        const interval = setInterval(() => {
            setTokenExpiry((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    handleLogout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [router]);

    const handleLogout = () => {
        authAPI.logout();
        localStorage.removeItem("user_data");
        router.push("/login");
    };

    if (!userData) {
        return (
            <div className="welcome-wrapper">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="welcome-wrapper">
            <div className="welcome-container">
                {/* Header */}
                <div className="welcome-header">
                    <div className="icon-wrapper">
                        <SportsIcon className="football-icon" />
                    </div>
                    <h1 className="welcome-title">Welcome to Football Manager!</h1>
                    <p className="welcome-subtitle">
                        Hello, {userData.name} {userData.lastName}
                    </p>
                </div>

                {/* User Info Card */}
                <div className="user-info-card">
                    <h2 className="card-title">Your Profile</h2>

                    <div className="info-row">
                        <PersonIcon className="info-icon" />
                        <div className="info-content">
                            <span className="info-label">Full Name</span>
                            <span className="info-value">
                                {userData.name} {userData.lastName}
                            </span>
                        </div>
                    </div>

                    <div className="info-row">
                        <EmailIcon className="info-icon" />
                        <div className="info-content">
                            <span className="info-label">Email</span>
                            <span className="info-value">{userData.emailId}</span>
                        </div>
                    </div>

                    <div className="info-row">
                        <AccessTimeIcon className="info-icon" />
                        <div className="info-content">
                            <span className="info-label">Session Expires In</span>
                            <span className={`info-value ${tokenExpiry <= 5 ? "expiring" : ""}`}>
                                {tokenExpiry} seconds
                            </span>
                        </div>
                    </div>
                </div>

                {/* Token Expiration Warning */}
                {tokenExpiry <= 10 && (
                    <div className="expiry-warning">
                        ⚠️ Your session will expire in {tokenExpiry} seconds. You will be
                        redirected to the login page.
                    </div>
                )}

                {/* Actions */}
                <div className="actions">
                    <button className="logout-button" onClick={handleLogout}>
                        <LogoutIcon className="button-icon" />
                        <span>Logout</span>
                    </button>
                </div>

                {/* Info Box */}
                <div className="info-box">
                    <h3 className="info-box-title">JWT Token Test</h3>
                    <p className="info-box-text">
                        This page demonstrates JWT token authentication. The token expires
                        after 20 seconds, and you will be automatically redirected to the
                        login page when it expires.
                    </p>
                    <p className="info-box-text">
                        Try waiting for the countdown to reach 0 to see the automatic
                        logout and redirect in action!
                    </p>
                </div>
            </div>
        </div>
    );
}
