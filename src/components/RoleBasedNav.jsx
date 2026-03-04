import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RoleBasedNav() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="nav-links">
        <Link 
          className="button" 
          to="/login"
          style={{
            background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)",
            color: "white",
            border: "none"
          }}
        >
          Login
        </Link>
        <Link 
          className="button" 
          to="/register"
          style={{
            background: "linear-gradient(135deg, #00ABE4 0%, #0088BB 100%)",
            color: "white",
            border: "none"
          }}
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="nav-links">
      {user.role === "student" && (
        <Link className="button ghost" to="/student">
          Student Dashboard
        </Link>
      )}
      {user.role === "faculty" && (
        <Link className="button ghost" to="/student">
          Faculty Dashboard
        </Link>
      )}
      {user.role === "admin" && (
        <Link className="button ghost" to="/admin">
          Admin Dashboard
        </Link>
      )}
      <button className="button secondary" onClick={logout} type="button">
        Sign out
      </button>
    </div>
  );
}
