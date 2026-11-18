export const validateBooking = (
  bookings,
  newBooking,
  excludeBookingId = null,
) => {
  const overlappingBookings = bookings.filter((booking) => {
    if (
      booking.id === excludeBookingId ||
      booking.status === "CANCELLED" ||
      booking.date !== newBooking.date
    ) {
      return false;
    }

    return (
      newBooking.startTime < booking.endTime &&
      newBooking.endTime > booking.startTime
    );
  });

  const courtConflict = overlappingBookings.some(
    (booking) => booking.courtId === newBooking.courtId,
  );

  if (courtConflict) {
    return {
      valid: false,
      message: "This court is already booked for the selected time.",
    };
  }

  const playerConflict = overlappingBookings.some((booking) =>
    booking.playerIds.some((playerId) =>
      newBooking.playerIds.includes(playerId),
    ),
  );

  if (playerConflict) {
    return {
      valid: false,
      message: "One or more players already have a booking during this time.",
    };
  }

  return { valid: true };
};

export const getPlayerNames = (playerIds, players) => {
  return playerIds
    .map((id) => players.find((player) => player.id === id)?.name)
    .filter(Boolean);
};

export const formatTime = (time) => {
  return new Date(`2000-01-01T${time}:00`).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  });
};
