import { Link } from "react-router-dom";

export default function LogoContainer() {
  return (
    <section>
      <Link className="logo-desktop" to="/">
        <h1>Greenhouse</h1>
      </Link>
    </section>
  );
}
