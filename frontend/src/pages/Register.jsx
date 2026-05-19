import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("⚠️ All fields are required");
            return;
        }
        setError("");
        setSuccess("");
        setLoading(true);
        try {
            await API.post("/auth/signup", {
                name,
                email,
                password,
            });
            setSuccess("🎉 Account created successfully! Redirecting to Login...");
            setTimeout(() => {
                nav("/");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "❌ Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="center">
            <div className="glass-card auth-card">
                <div className="card-header">
                    <span className="card-emoji">📝</span>
                    <h2>Create Account</h2>
                    <p className="subtitle">Sign up for smart AI complaint support</p>
                </div>

                {error && <div className="error-alert">{error}</div>}
                {success && <div className="success-alert">{success}</div>}

                <form onSubmit={registerUser}>
                    <div className="input-group">
                        <span className="input-icon">👤</span>
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>

                    <div className="input-group">
                        <span className="input-icon">📧</span>
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>

                    <div className="input-group">
                        <span className="input-icon">🔑</span>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "⌛ Registering..." : "✨ Create Account"}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>Already have an account? </span>
                    <Link to="/" className="auth-link">Login 🔐</Link>
                </div>
            </div>
        </div>
    );
}