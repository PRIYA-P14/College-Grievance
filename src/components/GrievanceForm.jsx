import { useMemo, useState } from "react";
import { CATEGORIES, WORD_COUNT_LIMITS } from "../utils/constants.js";
import { getWordCount, isWordCountValid } from "../utils/validators.js";

const initialState = {
  title: "",
  category: "Academic",
  description: ""
};

export default function GrievanceForm({ onSubmit, submitting }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const wordCount = useMemo(() => getWordCount(form.description), [form.description]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isWordCountValid(form.description)) {
      setError(
        `Grievance details must be between ${WORD_COUNT_LIMITS.min} and ${WORD_COUNT_LIMITS.max} words.`
      );
      return;
    }
    setError("");
    onSubmit?.(form);
    setForm(initialState);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div>
        <label className="meta">Title</label>
        <input
          className="input"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Short grievance title"
          required
        />
      </div>
      <div>
        <label className="meta">Category</label>
        <select className="select" name="category" value={form.category} onChange={handleChange}>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="meta">Grievance Details</label>
        <textarea
          className="textarea"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the grievance without revealing personal details."
          required
        />
        <div className="meta">
          Word count: {wordCount} / {WORD_COUNT_LIMITS.max}
        </div>
      </div>
      {error && <div className="meta" style={{ color: "var(--danger)" }}>{error}</div>}
      <button 
        className="button" 
        type="submit" 
        disabled={submitting}
        style={{ 
          background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)", 
          color: "white",
          border: "none"
        }}
      >
        {submitting ? "Submitting..." : "Submit Anonymously"}
      </button>
    </form>
  );
}
