import { STATUS_CLASS } from "../utils/constants.js";

export default function StatusBadge({ status }) {
  const className = STATUS_CLASS[status] || "pending";
  return <span className={`badge ${className}`}>{status}</span>;
}
