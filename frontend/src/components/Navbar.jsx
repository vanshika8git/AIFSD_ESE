import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setToken }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        navigate("/");
    };

    return (
        <div className="navbar">
            <div className="logo">🛡️ AI Complaints</div>

            <div className="nav-links">
                <Link to="/dashboard">📊 Dashboard</Link>
                <Link to="/add">➕ Add Complaint</Link>
                <Link to="/complaints">📋 Complaints</Link>
                <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
            </div>
        </div>
    );
}