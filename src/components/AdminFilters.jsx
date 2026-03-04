import { CATEGORIES, STATUSES } from "../utils/constants.js";

export default function AdminFilters({ filters, onChange }) {
  const visibleStatuses = STATUSES.filter((status) => status !== "Escalated");

  return (
    <div className="grid grid-2">
      <div>
        <label className="meta">Category</label>
        <select
          className="select"
          value={filters.category}
          onChange={(event) => onChange({ ...filters, category: event.target.value })}
        >
          <option value="">All</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="meta">Status</label>
        <select
          className="select"
          value={filters.status}
          onChange={(event) => onChange({ ...filters, status: event.target.value })}
        >
          <option value="">All</option>
          {visibleStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
