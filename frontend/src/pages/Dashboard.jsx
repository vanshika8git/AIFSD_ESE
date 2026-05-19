import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        resolved: 0,
        highPriority: 0,
    });
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    useEffect(() => {
        API.get("/complaints")
            .then((res) => {
                const complaints = res.data;
                setStats({
                    total: complaints.length,
                    pending: complaints.filter(c => c.status === "Pending").length,
                    resolved: complaints.filter(c => c.status === "Resolved").length,
                    highPriority: complaints.filter(c => c.priority === "High").length,
                });
            })
            .catch((err) => console.error("Error fetching stats:", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-hero">
                <div className="hero-emoji">🤖✨</div>
                <h1>AI Complaint Management System</h1>
                <p className="hero-sub text-center">
                    Welcome back, <span className="highlight">{user.name || "User"}</span>! 👋 Manage your grievances with AI automation.
                </p>
            </div>

            <div className="centered-content">
                <div className="quick-actions">
                    <Link to="/add" className="btn-action primary-gradient">
                        <span>➕ File a Complaint</span>
                    </Link>
                    <Link to="/complaints" className="btn-action secondary-gradient">
                        <span>📋 View My Complaints</span>
                    </Link>
                </div>

                <h2>📊 Quick Insights</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-icon">📁</span>
                        <h3>Total Filed</h3>
                        <p className="stat-val">{loading ? "..." : stats.total}</p>
                    </div>
                    <div className="stat-card">
                        <span className="stat-icon">⏳</span>
                        <h3>Pending</h3>
                        <p className="stat-val pending">{loading ? "..." : stats.pending}</p>
                    </div>
                    <div className="stat-card">
                        <span className="stat-icon">✅</span>
                        <h3>Resolved</h3>
                        <p className="stat-val resolved">{loading ? "..." : stats.resolved}</p>
                    </div>
                    <div className="stat-card">
                        <span className="stat-icon">🔥</span>
                        <h3>High Priority</h3>
                        <p className="stat-val urgent">{loading ? "..." : stats.highPriority}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}