import { LayoutDashboard, CalendarDays, Users, Trophy, X } from "lucide-react";

function Sidebar({ activePage, setActivePage, mobileOpen, closeMobile }) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "bookings", label: "Bookings", icon: CalendarDays },
    { id: "players", label: "Players", icon: Users },
  ];

  return (
    <>
      {mobileOpen && <div className="sidebar-overlay" onClick={closeMobile} />}

      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <Trophy size={22} />
          </div>
          <span>CourtFlow</span>
          <button className="mobile-close" onClick={closeMobile}>
            <X size={20} />
          </button>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        <nav>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-item ${activePage === id ? "active" : ""}`}
              onClick={() => {
                setActivePage(id);
                closeMobile();
              }}
            >
              <Icon size={19} />
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="club-info">
            <div className="club-avatar">BC</div>
            <div>
              <strong>Badminton Club</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
