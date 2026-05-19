import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddComplaint() {
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        const { title, description, category, location } = form;
        if (!title || !description || !category || !location) {
            setError("⚠️ Please fill in all fields");
            return;
        }
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await API.post("/complaints", form);
            setSuccess("🎉 Complaint successfully registered with AI analysis!");
            setTimeout(() => {
                nav("/complaints");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "❌ Failed to submit complaint.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="center">
            <div className="glass-card form-card">
                <div className="card-header">
                    <span className="card-emoji">✍️</span>
                    <h2>File a Complaint</h2>
                    <p className="subtitle">Submit details. Our AI will categorize and route it instantly.</p>
                </div>

                {error && <div className="error-alert">{error}</div>}
                {success && <div className="success-alert">{success}</div>}

                <form onSubmit={submit}>
                    <div className="input-group">
                        <span className="input-icon">📌</span>
                        <input 
                            placeholder="Title (e.g., Streetlight out)" 
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })} 
                        />
                    </div>

                    <div className="input-group">
                        <span className="input-icon">📂</span>
                        <input 
                            placeholder="Category (e.g., Electricity, Water)" 
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })} 
                        />
                    </div>

                    <div className="input-group">
                        <span className="input-icon">📍</span>
                        <input 
                            placeholder="Location (e.g., Sector 15, Block B)" 
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })} 
                        />
                    </div>

                    <div className="input-group">
                        <span className="input-icon textarea-icon">💬</span>
                        <textarea 
                            placeholder="Provide a detailed description of your issue..." 
                            rows={4}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })} 
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "⌛ Analyzing & Submitting..." : "🚀 File Complaint"}
                    </button>
                </form>
            </div>
        </div>
    );
}