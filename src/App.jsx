import { useState } from "react";
import { XCircle, RefreshCw } from "lucide-react";
import { useBookings } from "./features/bookings/hooks/useBookings";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Dashboard from "./features/dashboard/Dashboard";
import Bookings from "./features/bookings/Bookings";
import Players from "./features/players/Players";
import BookingDetails from "./features/bookings/BookingDetails";
import BookingForm from "./features/bookings/BookingForm";

function App() {
  const {
    bookings,
    loading,
    error,
    retry,
    addBooking,
    updateBooking,
    cancelBooking,
  } = useBookings();

  const [activePage, setActivePage] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageTitles = {
    dashboard: "Dashboard",
    bookings: "Bookings",
    players: "Players",
  };

  const handleCreateBooking = () => {
    setEditingBooking(null);
    setShowForm(true);
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBooking(null);
  };

  const handleSubmitBooking = (bookingData) => {
    if (editingBooking) {
      return updateBooking(editingBooking.id, bookingData);
    }

    return addBooking(bookingData);
  };

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      <main className="main">
        <Header
          title={pageTitles[activePage]}
          onMenuClick={() => setMobileOpen(true)}
        />

        {loading ? (
          <div className="loading-state">
            <RefreshCw className="spin" size={28} />
            <p>Loading CourtFlow...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <XCircle size={32} />
            <h3>Unable to load bookings</h3>
            <button className="primary-button" onClick={retry}>
              Try again
            </button>
          </div>
        ) : (
          <>
            {activePage === "dashboard" && <Dashboard bookings={bookings} />}

            {activePage === "bookings" && (
              <Bookings
                bookings={bookings}
                onCancel={cancelBooking}
                onSelect={setSelectedBooking}
                onCreate={handleCreateBooking}
                onEdit={handleEditBooking}
              />
            )}

            {activePage === "players" && <Players />}
          </>
        )}
      </main>

      {showForm && (
        <BookingForm
          initialBooking={editingBooking}
          onClose={handleCloseForm}
          onSubmit={handleSubmitBooking}
        />
      )}

      {selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
}

export default App;
