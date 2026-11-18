import { CalendarDays, CheckCircle, MapPin, Trophy, Users } from "lucide-react";
import { courts, players } from "../../data/mockData";
import StatusBadge from "../../components/common/StatusBadge";
import BookingTable from "../bookings/BookingTable";

function Dashboard({ bookings }) {
  const today = new Date().toISOString().split("T")[0];

  const todayBookings = bookings.filter(
    (booking) => booking.date === today && booking.status !== "CANCELLED",
  );

  const stats = [
    {
      label: "Total Courts",
      value: courts.length,
      icon: MapPin,
      color: "blue",
    },
    {
      label: "Today's Bookings",
      value: todayBookings.length,
      icon: CalendarDays,
      color: "purple",
    },
    {
      label: "Confirmed",
      value: todayBookings.length,
      icon: CheckCircle,
      color: "green",
    },
    {
      label: "Registered Players",
      value: players.length,
      icon: Users,
      color: "orange",
    },
  ];

  return (
    <div className="page-content">
      <div className="welcome-section">
        <div>
          <h2>Good day!</h2>
          <p>Here's what's happening at your club today.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div className="stat-card" key={label}>
            <div className={`stat-icon ${color}`}>
              <Icon size={21} />
            </div>
            <div>
              <p>{label}</p>
              <h2>{value}</h2>
            </div>
          </div>
        ))}
      </div>

      <section className="section">
        <div className="section-heading">
          <div>
            <h2>Court availability</h2>
            <p>Today's court schedule</p>
          </div>
        </div>

        <div className="court-grid">
          {courts.map((court) => {
            const courtBookings = todayBookings.filter(
              (booking) => booking.courtId === court.id,
            );

            return (
              <div className="court-card" key={court.id}>
                <div className="court-card-top">
                  <div className="court-icon">
                    <Trophy size={21} />
                  </div>
                  <StatusBadge
                    status={courtBookings.length ? "BOOKED" : "AVAILABLE"}
                  />
                </div>

                <h3>{court.name}</h3>
                <p>{court.type} court</p>

                <div className="court-footer">
                  <CalendarDays size={15} />
                  {courtBookings.length} booking(s) today
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <h2>Recent bookings</h2>
            <p>Latest scheduled sessions</p>
          </div>
        </div>

        <BookingTable bookings={todayBookings.slice(0, 5)} />
      </section>
    </div>
  );
}

export default Dashboard;
