import { useEffect, useState } from "react";
import GrievanceForm from "../components/GrievanceForm.jsx";
import ComplaintList from "../components/ComplaintList.jsx";
import { fetchMyComplaints, rateComplaint, submitGrievance } from "../services/grievanceService.js";

export default function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadComplaints = async () => {
    setLoading(true);
    try {
      const data = await fetchMyComplaints();
      setComplaints(data);
    } catch (err) {
      setError("Unable to load grievances.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setError("");
    try {
      const created = await submitGrievance(payload);
      setComplaints((prev) => [
        { ...created, status: "Pending", createdAt: new Date().toISOString() },
        ...prev
      ]);
    } catch (err) {
      const message = err?.response?.data?.message;
      setError(message || "Submission failed. Please retry.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRate = async (id, rating) => {
    try {
      await rateComplaint(id, rating);
      setComplaints((prev) =>
        prev.map((item) => (item.id === id ? { ...item, rating } : item))
      );
    } catch (err) {
      setError("Unable to submit rating.");
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      //background: "#F5F7FA",
      padding: "40px 24px"
    }}>
      <div className="grid" style={{ gap: 32, maxWidth: 1400, margin: "0 auto" }}>
        <div className="card" style={{ 
          background: "white",
          borderRadius: 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}>
          <h2>Submit Anonymous Grievance</h2>
          <p className="meta">Your identity is protected. Do not include personal identifiers.</p>
          <GrievanceForm onSubmit={handleSubmit} submitting={submitting} />
        </div>
        <div>
          <div className="card-title">
            <h2 style={{ color: "#1a202c" }}>Your Complaint Tracker</h2>
            <button className="button ghost" type="button" onClick={loadComplaints} style={{
              background: "white",
              color: "#00ABE4",
              border: "2px solid #e2e8f0",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>
              Refresh
            </button>
          </div>
          {error && <div className="meta" style={{ color: "#e53e3e", background: "#fff5f5", padding: 12, borderRadius: 8, border: "1px solid #feb2b2" }}>{error}</div>}
          {loading ? (
            <div className="card" style={{ 
              background: "white",
              borderRadius: 20,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}>Loading grievances...</div>
          ) : (
            <div style={{ 
              background: "white",
              borderRadius: 20,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              padding: 24
            }}>
              <ComplaintList complaints={complaints} onRate={handleRate} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
