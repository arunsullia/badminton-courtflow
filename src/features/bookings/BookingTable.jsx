import { CalendarDays } from "lucide-react";
import { courts } from "../../data/mockData";
import { formatTime } from "./utils/bookingUtils";
import StatusBadge from "../../components/common/StatusBadge";

function BookingTable({ bookings, onCancel, onSelect, onEdit }) {
  if (!bookings.length) {
    return (
      <div className="empty-state">
        <CalendarDays size={32} />
        <h3>No bookings found</h3>
        <p>There are no bookings matching your selection.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Court</th>
            <th>Time</th>
            <th>Players</th>
            <th>Status</th>
            {(onCancel || onEdit) && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => onSelect?.(booking)}
                >
                  {booking.id}
                </button>
              </td>

              <td>
                {courts.find((court) => court.id === booking.courtId)?.name}
              </td>

              <td>
                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
              </td>

              <td>{booking.playerIds.length} players</td>

              <td>
                <StatusBadge status={booking.status} />
              </td>

              {(onCancel || onEdit) && (
                <td>
                  {booking.status !== "CANCELLED" && (
                    <div className="table-actions">
                      {onEdit && (
                        <button
                          type="button"
                          className="secondary-button"
                          onClick={() => onEdit(booking)}
                        >
                          Edit
                        </button>
                      )}

                      {onCancel && (
                        <button
                          type="button"
                          className="action-button"
                          onClick={() => onCancel(booking.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingTable;
