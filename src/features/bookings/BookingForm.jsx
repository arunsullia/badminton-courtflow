import { useEffect, useState } from "react";
import { TIME_SLOTS } from "../../constants/booking-constants";
import { AlertCircle, X } from "lucide-react";
import { courts, players } from "../../data/mockData";
import { formatTime } from "./utils/bookingUtils";

function BookingForm({ onClose, onSubmit, initialBooking = null }) {
  const isEditing = Boolean(initialBooking);

  const [courtId, setCourtId] = useState("C1");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("06:00");
  const [playerIds, setPlayerIds] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (initialBooking) {
      setCourtId(initialBooking.courtId);
      setDate(initialBooking.date);
      setStartTime(initialBooking.startTime);
      setPlayerIds([...initialBooking.playerIds]);
    } else {
      setCourtId("C1");
      setDate(new Date().toISOString().split("T")[0]);
      setStartTime("06:00");
      setPlayerIds([]);
    }

    setMessage("");
  }, [initialBooking]);

  const togglePlayer = (playerId) => {
    setPlayerIds((previous) => {
      if (previous.includes(playerId)) {
        return previous.filter((id) => id !== playerId);
      }

      if (previous.length >= 4) {
        return previous;
      }

      return [...previous, playerId];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!date) {
      setMessage("Please select a booking date.");
      return;
    }

    if (playerIds.length === 0) {
      setMessage("Please select at least one player.");
      return;
    }

    const [hours, minutes] = startTime.split(":").map(Number);

    const endDate = new Date(2000, 0, 1, hours + 1, minutes);

    const endTime = [
      String(endDate.getHours()).padStart(2, "0"),
      String(endDate.getMinutes()).padStart(2, "0"),
    ].join(":");

    const bookingData = {
      courtId,
      date,
      startTime,
      endTime,
      playerIds,
    };

    const result = onSubmit(bookingData);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h2 id="booking-form-title">
              {isEditing ? "Edit booking" : "Create booking"}
            </h2>

            <p>
              {isEditing
                ? `Update booking ${initialBooking.id}.`
                : "Reserve a court for your players."}
            </p>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Select court
            <select
              value={courtId}
              onChange={(e) => setCourtId(e.target.value)}
            >
              {courts.map((court) => (
                <option key={court.id} value={court.id}>
                  {court.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Booking date
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>

          <label>
            Starting time
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            >
              {TIME_SLOTS.map((time) => (
                <option key={time} value={time}>
                  {formatTime(time)}
                </option>
              ))}
            </select>
          </label>

          <div className="player-selection">
            <label>Select players (maximum 4)</label>

            <div className="player-options">
              {players.map((player) => (
                <label className="player-option" key={player.id}>
                  <input
                    type="checkbox"
                    checked={playerIds.includes(player.id)}
                    onChange={() => togglePlayer(player.id)}
                  />

                  <span>{player.name}</span>
                  <small>{player.level}</small>
                </label>
              ))}
            </div>
          </div>

          {message && (
            <div className="form-error" role="alert">
              <AlertCircle size={17} />
              {message}
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {isEditing ? "Save Changes" : "Confirm booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
