import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ComplaintList() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch complaints
    const fetchComplaints = (url = "/complaints") => {
        setLoading(true);
        API.get(url)
            .then((res) => setData(res.data))
            .catch((err) => console.error("Error loading complaints:", err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    // Handle search by location
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term.trim() === "") {
            fetchComplaints();
        } else {
            fetchComplaints(`/complaints/search/location?location=${term}`);
        }
    };

    // Handle category filter
    const handleCategory = (e) => {
        const cat = e.target.value;
        setCategoryFilter(cat);
        if (cat === "") {
            fetchComplaints();
        } else {
            fetchComplaints(`/complaints/filter/category?category=${cat}`);
        }
    };

    // Handle Resolve Complaint Action
    const handleResolve = async (id) => {
        try {
            await API.put(`/complaints/${id}`, { status: "Resolved" });
            // Update local state instantly so UI responds immediately
            setData(prevData => prevData.map(c => c._id === id ? { ...c, status: "Resolved" } : c));
        } catch (err) {
            console.error("Error resolving complaint:", err);
            alert("❌ Failed to resolve complaint. Please try again.");
        }
    };

    // Handle Delete Complaint Action
    const handleDelete = async (id) => {
        if (window.confirm("⚠️ Are you sure you want to permanently delete this complaint?")) {
            try {
                await API.delete(`/complaints/${id}`);
                // Remove from state instantly
                setData(prevData => prevData.filter(c => c._id !== id));
            } catch (err) {
                console.error("Error deleting complaint:", err);
                alert("❌ Failed to delete complaint. Please try again.");
            }
        }
    };

    // Priority color helper
    const getPriorityBadgeClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high": return "badge-red";
            case "medium": return "badge-yellow";
            case "low": return "badge-green";
            default: return "badge-blue";
        }
    };

    return (
        <div className="list-container">
            <div className="list-header text-center">
                <span className="header-emoji">📋</span>
                <h2>Registered Complaints</h2>
                <p className="subtitle">Real-time status updates and automatic AI routing</p>
            </div>

            <div className="search-filter-bar">
                <div className="search-box">
                    <span className="search-icon">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Search by Location..." 
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className="filter-box">
                    <span className="filter-icon">📂</span>
                    <select value={categoryFilter} onChange={handleCategory}>
                        <option value="">All Categories</option>
                        <option value="Electricity">Electricity ⚡</option>
                        <option value="Water">Water 💧</option>
                        <option value="Sanitation">Sanitation 🧹</option>
                        <option value="Roads">Roads 🛣️</option>
                        <option value="Fire">Fire Danger 🔥</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center loading-container">
                    <span className="spinner-emoji">⏳</span>
                    <p>Analyzing and fetching complaints...</p>
                </div>
            ) : data.length === 0 ? (
                <div className="text-center empty-container">
                    <span className="empty-emoji">📦</span>
                    <p>No complaints found. Go ahead and add some!</p>
                </div>
            ) : (
                <div className="grid">
                    {data.map((c, i) => (
                        <div className="card glass-card shadow-effect" key={i}>
                            <div className="card-top">
                                <span className={`priority-badge ${getPriorityBadgeClass(c.priority)}`}>
                                    🚨 {c.priority || "Medium"}
                                </span>
                                <span className="status-badge">
                                    ⚙️ {c.status}
                                </span>
                            </div>

                            <h3 className="card-title">📌 {c.title}</h3>
                            <p className="card-desc">📝 {c.description}</p>

                            <div className="ai-insight-box">
                                <h4>🤖 AI Analysis Insights:</h4>
                                <p className="ai-summary"><strong>Summary:</strong> {c.aiSummary || "Generating summary..."}</p>
                                <p className="ai-dept"><strong>Assigned Department:</strong> 🏢 {c.department || "General Department"}</p>
                                <p className="ai-response"><strong>Auto Response:</strong> 💬 {c.autoResponse || "Reviewing details..."}</p>
                            </div>

                            <div className="card-actions">
                                {c.status !== "Resolved" && (
                                    <button 
                                        className="resolve-btn" 
                                        onClick={() => handleResolve(c._id)}
                                    >
                                        ✅ Resolve
                                    </button>
                                )}
                                <button 
                                    className="delete-btn" 
                                    onClick={() => handleDelete(c._id)}
                                >
                                    🗑️ Delete
                                </button>
                            </div>

                            <div className="card-footer">
                                <span className="footer-meta">📍 {c.location}</span>
                                <span className="footer-meta">📅 {new Date(c.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}