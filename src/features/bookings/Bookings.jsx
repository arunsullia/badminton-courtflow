import { useMemo, useState } from "react";
import { courts } from "../../data/mockData";
import { Plus, Search } from "lucide-react";
import BookingTable from "./BookingTable";

function Bookings({ bookings, onCancel, onSelect, onCreate, onEdit }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const courtName =
        courts.find((court) => court.id === booking.courtId)?.name || "";

      const searchTerm = search.toLowerCase();

      const matchesSearch =
        booking.id.toLowerCase().includes(searchTerm) ||
        courtName.toLowerCase().includes(searchTerm);

      const matchesStatus =
        statusFilter === "ALL" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  return (
    <div className="page-content">
      <div className="section-heading">
        <div>
          <h2>All bookings</h2>
          <p>Manage court reservations and sessions.</p>
        </div>

        <button className="primary-button" onClick={onCreate}>
          <Plus size={18} />
          New booking
        </button>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <Search size={18} />

          <input
            aria-label="Search bookings"
            placeholder="Search booking or court..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          aria-label="Filter by booking status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All statuses</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <BookingTable
        bookings={filteredBookings}
        onCancel={onCancel}
        onSelect={onSelect}
        onEdit={onEdit}
      />
    </div>
  );
}

export default Bookings;
