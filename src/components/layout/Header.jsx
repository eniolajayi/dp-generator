import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        DP Generator
      </Link>
      <nav>
        <Link to="/help">How it works</Link>
      </nav>
    </header>
  );
}
