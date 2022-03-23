import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <div className="logo">DP Generator</div>
      <nav>
        <Link to="/how">How it works</Link>
      </nav>
    </header>
  );
}
