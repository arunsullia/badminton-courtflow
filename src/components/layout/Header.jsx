import { Menu } from "lucide-react";

function Header({ title, onMenuClick }) {
  return (
    <header className="header">
      <button className="menu-button" onClick={onMenuClick}>
        <Menu size={22} />
      </button>

      <div>
        <h1>{title}</h1>
        <p>Manage your badminton club operations</p>
      </div>

      <div className="header-date">
        {new Date().toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>
    </header>
  );
}

export default Header;
