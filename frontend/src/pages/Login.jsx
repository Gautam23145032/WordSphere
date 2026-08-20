import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { login } from "../services/authApi";
import "../styles/app.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            setError("");

            const data = await login({ email, password });

            localStorage.setItem("token", data.token);

            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message || "Login failed"
            );
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">

                <h1 className="auth-title">
                    WordSphere
                </h1>

                <h2 className="auth-heading">
                    Login
                </h2>

                <form
                    onSubmit={handleLogin}
                    className="auth-form"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    
                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                        <button
                            type="button"
                            className="eye-button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    <button type="submit">
                        Login
                    </button>

                    {error && (
                        <p className="error-box">
                            {error}
                        </p>
                    )}

                </form>

                <p className="auth-text">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}