import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/", { replace: true });
    } catch (err) {
      const message = err?.response?.data?.message;
      setError(message || "Unable to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
     // background: "#F5F7FA",
      padding: "60px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div className="card" style={{ 
        maxWidth: 480, 
        background: "white",
        borderRadius: 24,
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <h2>Log in to SECE Grievance Portal</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div>
            <label className="meta">Sri Eshwar College Email</label>
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@sece.ac.in"
              required
            />
          </div>
          <div>
            <label className="meta">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
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
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>
        <p className="meta" style={{ marginTop: 16 }}>
          New to SECE Grievance Portal? <Link to="/register">Create an account</Link> with your college email
        </p>
      </div>
    </div>
  );
}
