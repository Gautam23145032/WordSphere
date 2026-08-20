    import { useState } from "react";
    import { Link } from "react-router-dom";
    import { register } from "../services/authApi";
    import { useNavigate } from "react-router-dom";
    import { Eye, EyeOff } from "lucide-react";
    import "../styles/app.css";

    export default function Register() {
    const [username, setUsername] =
        useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] =
        useState("");

    async function handleRegister(e) {
        e.preventDefault();

        try {

            setError("");

            await register({username, email, password,});

            navigate("/login");

        } catch (error) {

            setError(error.response?.data?.message || "Registration failed");

        }
        }

    return (
        <div className="auth-container">
        <div className="auth-card">

            <h1 className="auth-title">
            WordSphere
            </h1>

            <h2 className="auth-heading">
            Create Account
            </h2>

            <form
            onSubmit={handleRegister}
            className="auth-form"
            >

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                setUsername(
                    e.target.value
                )
                }
                required
            />

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
                Register
            </button>
            {
            error &&
            <p className="error-box">
                {error}
            </p>
            }
            </form>

            <p className="auth-text">
            Already have an account?{" "}
            <Link to="/login">
                Login
            </Link>
            </p>

        </div>
        </div>
    );
    }