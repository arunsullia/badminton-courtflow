import { X } from "lucide-react";
import { courts, players } from "../../data/mockData";
import { formatTime, getPlayerNames } from "./utils/bookingUtils";
import StatusBadge from "../../components/common/StatusBadge";

function BookingDetails({ booking, onClose }) {
  if (!booking) return null;

  const court = courts.find((c) => c.id === booking.courtId);
  const bookingPlayers = getPlayerNames(booking.playerIds, players);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-detail-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="booking-detail-title">{booking.id}</h2>
            <p>Booking details</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            <X />
          </button>
        </div>

        <div className="detail-list">
          <div>
            <span>Court</span>
            <strong>{court?.name}</strong>
          </div>
          <div>
            <span>Date</span>
            <strong>{booking.date}</strong>
          </div>
          <div>
            <span>Time</span>
            <strong>
              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </strong>
          </div>
          <div>
            <span>Status</span>
            <StatusBadge status={booking.status} />
          </div>
        </div>

        <h3 className="detail-subtitle">Players</h3>
        {bookingPlayers.map((name) => (
          <div className="detail-player" key={name}>
            <div className="player-avatar">{name.charAt(0)}</div>
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingDetails;
