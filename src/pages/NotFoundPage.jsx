import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h2>Page not found</h2>
      <p className="meta">The page you requested does not exist.</p>
      <Link className="button ghost" to="/">
        Back to home
      </Link>
    </div>
  );
}
