import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("⚠️ Please fill in all fields");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const res = await API.post("/auth/login", {
                email,
                password,
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setToken(res.data.token);
            nav("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "❌ Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="center">
            <div className="glass-card auth-card">
                <div className="card-header">
                    <span className="card-emoji">🔐</span>
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Login to manage your complaints smartly</p>
                </div>

                {error && <div className="error-alert">{error}</div>}

                <form onSubmit={loginUser}>
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
                         {loading ? "⌛ Logging in..." : "🚀 Login"}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>New user? </span>
                    <Link to="/register" className="auth-link">Create an Account 📝</Link>
                </div>
            </div>
        </div>
    );
}