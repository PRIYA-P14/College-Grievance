import React, { useEffect, useState } from "react";
import AdminFilters from "../components/AdminFilters.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import SlaTimer from "../components/SlaTimer.jsx";
import { DEPARTMENTS } from "../utils/constants.js";
import { formatDateTime } from "../utils/format.js";
import { fetchAllComplaints, updateComplaintStatus } from "../services/adminService.js";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filters, setFilters] = useState({ category: "", status: "" });
  const [adminRemarks, setAdminRemarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const loadComplaints = async (incomingFilters = filters) => {
    setLoading(true);
    try {
      const data = await fetchAllComplaints(incomingFilters);
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

  useEffect(() => {
    loadComplaints(filters);
  }, [filters]);

  const handleUpdate = async (id, payload) => {
    try {
      setError("");
      setSuccess("");
      if (adminRemarks[id]) {
        payload.remarks = adminRemarks[id];
      }
      await updateComplaintStatus(id, payload);
      setComplaints((prev) =>
        prev.map((item) => (item._id === id ? { ...item, ...payload } : item))
      );
      setAdminRemarks((prev) => ({ ...prev, [id]: "" }));
      setSuccess("Updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      const message = err?.response?.data?.message;
      setError(message || "Update failed. Try again.");
    }
  };

  const getReporterId = (item) => {
    const value = item?.studentId?._id || item?.studentId?.id || item?.studentId || "";
    return typeof value === "string" ? value : "";
  };

  const getReporterRole = (item) => item?.studentId?.role || "student";

  const facultyComplaints = complaints.filter((item) => getReporterRole(item) === "faculty");
  const studentComplaints = complaints.filter((item) => getReporterRole(item) !== "faculty");

  const renderTable = (items, label, gradientColor) => (
    <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 24, borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.05)" }}>
      <div style={{ padding: 20, borderBottom: "1px solid #e8e8e8", background: gradientColor }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "white", display: "flex", alignItems: "center", gap: 12 }}>
          {label} 
          <span style={{ background: "rgba(255,255,255,0.25)", padding: "4px 12px", borderRadius: 12, fontSize: 14, fontWeight: 600 }}>
            {items.length}
          </span>
        </h3>
      </div>
      {loading ? (
        <div style={{ padding: 32, textAlign: "center" }}>Loading grievances...</div>
      ) : items.length === 0 ? (
        <div style={{ padding: 32, textAlign: "center", color: "#999" }}>No grievances found.</div>
      ) : (
        <div>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "auto" }}>
            <thead>
              <tr style={{ background: "#f0f0f0", borderBottom: "2px solid #ddd" }}>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#333" }}>Category</th>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#333" }}>Description</th>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#333" }}>Reporter</th>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#333" }}>Role</th>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#333" }}>Department</th>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#333" }}>Status</th>
                <th style={{ padding: 12, textAlign: "left", fontWeight: 600, color: "#333" }}>Date</th>
                <th style={{ padding: 12, textAlign: "center", fontWeight: 600, color: "#333" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <React.Fragment key={item._id || item.id}>
                  <tr
                    style={{
                      borderBottom: "1px solid #eee",
                      background: idx % 2 === 0 ? "#fafafa" : "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => setExpandedId(expandedId === (item._id || item.id) ? null : item._id || item.id)}
                  >
                    <td style={{ padding: 12 }}>
                      <span style={{ display: "inline-block", background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)", color: "white", padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, boxShadow: "0 2px 8px rgba(0,171,228,0.3)" }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ padding: 12, fontSize: 13, minWidth: 200 }}>
                      {item.description}
                    </td>
                    <td style={{ padding: 12, fontSize: 13 }}>
                      {getReporterId(item).substring(0, 8)}...
                    </td>
                    <td style={{ padding: 12, fontSize: 13, textTransform: "capitalize" }}>
                      {getReporterRole(item)}
                    </td>
                    <td style={{ padding: 12, fontSize: 13, fontWeight: 600 }}>{item.department || "—"}</td>
                    <td style={{ padding: 12 }}>
                      <StatusBadge status={item.status} />
                    </td>
                    <td style={{ padding: 12, fontSize: 12, color: "#666" }}>{formatDateTime(item.createdAt)}</td>
                    <td style={{ padding: 12, textAlign: "center" }}>
                      <button
                        className="button"
                        style={{ fontSize: 12, padding: "8px 16px", borderRadius: 8, background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)", boxShadow: "0 4px 12px rgba(0,171,228,0.3)" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedId(expandedId === (item._id || item.id) ? null : item._id || item.id);
                        }}
                      >
                        {expandedId === (item._id || item.id) ? "Hide" : "Edit"}
                      </button>
                    </td>
                  </tr>

                  {expandedId === (item._id || item.id) && (
                    <tr style={{ background: "#f9f9f9", borderBottom: "1px solid #ddd" }}>
                      <td colSpan="8" style={{ padding: 20 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                          <div>
                            <div style={{ marginBottom: 16 }}>
                              <label style={{ display: "block", fontSize: 12, color: "#666", marginBottom: 4 }}>Full Description</label>
                              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: "#333" }}>{item.description}</p>
                            </div>
                            <div style={{ marginBottom: 16 }}>
                              <label style={{ display: "block", fontSize: 12, color: "#666", marginBottom: 4 }}>Current Remarks</label>
                              <p style={{ margin: 0, fontSize: 13, color: "#666", fontStyle: "italic" }}>{item.remarks || "No remarks yet"}</p>
                            </div>
                            <div>
                              <SlaTimer createdAt={item.createdAt} />
                            </div>
                          </div>

                          <div>
                            <div style={{ marginBottom: 12 }}>
                              <label style={{ display: "block", fontSize: 12, color: "#666", marginBottom: 4 }}>Add/Update Remarks</label>
                              <textarea
                                className="textarea"
                                placeholder="Enter admin remarks..."
                                value={adminRemarks[item._id || item.id] || ""}
                                onChange={(event) =>
                                  setAdminRemarks((prev) => ({ ...prev, [item._id || item.id]: event.target.value }))
                                }
                                style={{ fontSize: 12, marginBottom: 12 }}
                              />
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                              <div>
                                <label style={{ display: "block", fontSize: 12, color: "#666", marginBottom: 4 }}>Department</label>
                                <select
                                  className="select"
                                  value={item.department || ""}
                                  onChange={(event) => handleUpdate(item._id || item.id, { department: event.target.value })}
                                  style={{ fontSize: 12 }}
                                >
                                  <option value="">Select Department</option>
                                  {DEPARTMENTS.map((dept) => (
                                    <option key={dept} value={dept}>
                                      {dept}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label style={{ display: "block", fontSize: 12, color: "#666", marginBottom: 4 }}>Status</label>
                                <select
                                  className="select"
                                  value={item.status}
                                  onChange={(event) => handleUpdate(item._id || item.id, { status: event.target.value })}
                                  style={{ fontSize: 12 }}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Resolved">Resolved</option>
                                </select>
                              </div>
                            </div>
                            <button
                              className="button"
                              type="button"
                              onClick={() => handleUpdate(item._id || item.id, {})}
                              style={{ width: "100%", fontSize: 12 }}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ padding: "24px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 36, fontWeight: 800, margin: 0, color: "#1a202c", letterSpacing: "-0.5px" }}>Admin Dashboard</h1>
            <p style={{ color: "#718096", margin: "8px 0 0 0", fontSize: 14 }}>Manage and track all grievances</p>
          </div>
          <button 
            className="button" 
            type="button" 
            onClick={() => loadComplaints(filters)}
            style={{ background: "white", color: "#00ABE4", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Summary Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 32 }}>
          <div style={{ background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)", borderRadius: 16, padding: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Grievances</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "white" }}>{complaints.length}</div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #00ABE4 0%, #0095CC 100%)", borderRadius: 16, padding: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Pending</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "white" }}>
              {complaints.filter((c) => c.status === "Pending").length}
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #00ABE4 0%, #00C8E8 100%)", borderRadius: 16, padding: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>In Progress</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "white" }}>
              {complaints.filter((c) => c.status === "In Progress").length}
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg, #00ABE4 0%, #00D4F0 100%)", borderRadius: 16, padding: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.18)" }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.9)", marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Resolved</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "white" }}>
              {complaints.filter((c) => c.status === "Resolved").length}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="card" style={{ marginBottom: 24, padding: 24, borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 700, color: "#333" }}>Filters</h3>
        <AdminFilters
          filters={filters}
          onChange={(next) => {
            setFilters(next);
          }}
        />
      </div>

      {/* Messages */}
      {error && <div style={{ background: "#fee", color: "#c33", padding: "12px 16px", borderRadius: 12, marginBottom: 16, fontWeight: 600, boxShadow: "0 4px 12px rgba(239,68,68,0.2)" }}>{error}</div>}
      {success && <div style={{ background: "#d4edda", color: "#155724", padding: "12px 16px", borderRadius: 12, marginBottom: 16, fontWeight: 600, boxShadow: "0 4px 12px rgba(34,197,94,0.2)" }}>{success}</div>}

      <div>
        {renderTable(facultyComplaints, "Faculty Grievances", "linear-gradient(135deg, #00ABE4 0%, #0095CC 100%)")}
        {renderTable(studentComplaints, "Student Grievances", "linear-gradient(135deg, #00ABE4 0%, #00C8E8 100%)")}
      </div>
    </div>
  );
}
