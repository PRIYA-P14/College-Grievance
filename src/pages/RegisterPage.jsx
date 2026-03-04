import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { isCollegeEmail } from "../utils/validators.js";
import { COLLEGE_EMAIL_DOMAIN } from "../utils/constants.js";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!isCollegeEmail(form.email)) {
      setError(`Please use your college email ending with @${COLLEGE_EMAIL_DOMAIN}.`);
      return;
    }
    setLoading(true);
    try {
      await register(form);
      navigate("/", { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message;
      setError(message || "Registration failed. Please verify your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      //background: "#F5F7FA",
      padding: "60px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="card" style={{ 
        maxWidth: 520, 
        background: "white",
        borderRadius: 24,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <h2>Join SECE Grievance Portal</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label className="meta">Full Name</label>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="meta">Sri Eshwar College Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder={`you@${COLLEGE_EMAIL_DOMAIN}`}
              required
            />
          </div>
          <div>
            <label className="meta">Register As</label>
            <select
              className="select"
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </select>
          </div>
          <div>
            <label className="meta">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>
          {error && <div className="meta" style={{ color: "var(--danger)" }}>{error}</div>}
          <button 
            className="button" 
            type="submit" 
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)",
              color: "white",
              border: "none"
            }}
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>
        <p className="meta" style={{ marginTop: 16 }}>
          Already registered? <Link to="/login" style={{ color: "#00ABE4", fontWeight: 600 }}>Log in here</Link>
        </p>
      </div>
    </div>
  );
}
