import { useEffect, useState } from "react";
import { initialBookings } from "../../../data/mockData";
import { validateBooking } from "../utils/bookingUtils";

const STORAGE_KEY = "courtflow_bookings";

function getInitialBookings() {
  try {
    const savedBookings = localStorage.getItem(STORAGE_KEY);

    if (!savedBookings) {
      return initialBookings;
    }

    const parsedBookings = JSON.parse(savedBookings);

    if (!Array.isArray(parsedBookings)) {
      throw new Error("Invalid booking data");
    }

    return parsedBookings;
  } catch (error) {
    console.error("Could not load saved bookings:", error);
    return initialBookings;
  }
}

export function useBookings() {
  const [bookings, setBookings] = useState(getInitialBookings);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      setStorageError("");
    } catch (error) {
      console.error("Could not save bookings:", error);
      setStorageError("Unable to save changes in this browser.");
    }
  }, [bookings]);

  const addBooking = (newBooking) => {
    const validation = validateBooking(bookings, newBooking);

    if (!validation.valid) {
      return {
        success: false,
        message: validation.message,
      };
    }

    const booking = {
      ...newBooking,
      id: `BK-${Date.now()}`,
      status: "CONFIRMED",
    };

    setBookings((previous) => [...previous, booking]);

    return { success: true };
  };

  const updateBooking = (bookingId, updatedData) => {
    const existingBooking = bookings.find(
      (booking) => booking.id === bookingId,
    );

    if (!existingBooking) {
      return {
        success: false,
        message: "Booking not found.",
      };
    }

    if (existingBooking.status === "CANCELLED") {
      return {
        success: false,
        message: "Cancelled bookings cannot be edited.",
      };
    }

    const validation = validateBooking(bookings, updatedData, bookingId);

    if (!validation.valid) {
      return {
        success: false,
        message: validation.message,
      };
    }

    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === bookingId ? { ...booking, ...updatedData } : booking,
      ),
    );

    return { success: true };
  };

  const cancelBooking = (bookingId) => {
    setBookings((previous) =>
      previous.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "CANCELLED" }
          : booking,
      ),
    );
  };

  const retry = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
      setStorageError("");
    } catch (error) {
      setStorageError("Unable to save changes in this browser.");
    }
  };

  return {
    bookings,
    loading: false,
    error: storageError,
    retry,
    addBooking,
    updateBooking,
    cancelBooking,
  };
}
