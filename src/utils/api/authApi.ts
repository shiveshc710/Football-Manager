import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

export interface LoginCredentials {
    emailId: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    userId: number;
    name: string;
    lastName: string;
    emailId: string;
}

export const authAPI = {
    // Login user and get JWT token
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await axios.post<LoginResponse>(
            `${API_BASE_URL}/login`,
            credentials
        );
        return response.data;
    },

    // Store token in localStorage
    setToken: (token: string) => {
        localStorage.setItem('jwt_token', token);
    },

    // Get token from localStorage
    getToken: (): string | null => {
        return localStorage.getItem('jwt_token');
    },

    // Remove token from localStorage
    removeToken: () => {
        localStorage.removeItem('jwt_token');
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!authAPI.getToken();
    },

    // Logout user
    logout: () => {
        authAPI.removeToken();
    },
};

// Axios interceptor to add JWT token to all requests
axios.interceptors.request.use(
    (config) => {
        const token = authAPI.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Axios interceptor to handle 401 errors (token expired)
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            authAPI.removeToken();
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
