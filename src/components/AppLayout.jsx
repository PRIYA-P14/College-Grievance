import { Outlet, Link } from "react-router-dom";
import RoleBasedNav from "./RoleBasedNav.jsx";

export default function AppLayout() {
  return (
    <div>
      <header className="header">
        <nav className="nav">
          <Link className="brand" to="/">
            <span className="brand-badge">Secure</span>
            Anonymous College Grievance System
          </Link>
          <RoleBasedNav />
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}
