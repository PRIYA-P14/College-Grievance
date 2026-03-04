import StatusBadge from "./StatusBadge.jsx";
import SlaTimer from "./SlaTimer.jsx";
import RatingStars from "./RatingStars.jsx";
import { formatDateTime } from "../utils/format.js";

export default function ComplaintCard({ complaint, onRate }) {
  return (
    <div className={`card ${complaint.escalated ? "highlight" : ""}`}>
      <div className="card-title">
        <div>
          <h3>{complaint.title}</h3>
          <div className="meta">{complaint.category} • {formatDateTime(complaint.createdAt)}</div>
        </div>
        <StatusBadge status={complaint.status} />
      </div>
      <p>{complaint.description}</p>
      <div className="meta">Department: {complaint.department || "TBD"}</div>
      <div className="meta">Admin remarks: {complaint.remarks || "Pending review"}</div>
      <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <SlaTimer createdAt={complaint.createdAt} />
        {complaint.status === "Resolved" && (
          <RatingStars value={complaint.rating || 0} onChange={(rating) => onRate?.(complaint.id, rating)} />
        )}
      </div>
    </div>
  );
}
