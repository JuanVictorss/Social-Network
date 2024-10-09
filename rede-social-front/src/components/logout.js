import { logout } from "../services/authService";
import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <>
      <Link to="/">
        <button onClick={logout}>Logout</button>
      </Link>
    </>
  );
}
