const today = new Date().toISOString().split("T")[0];

export const courts = [
  { id: "C1", name: "Court 1", type: "Indoor" },
  { id: "C2", name: "Court 2", type: "Indoor" },
  { id: "C3", name: "Court 3", type: "Outdoor" },
];

export const players = [
  { id: "P1", name: "Arun", level: "Intermediate" },
  { id: "P2", name: "Chethan", level: "Intermediate" },
  { id: "P3", name: "Rahul", level: "Beginner" },
  { id: "P4", name: "Kiran", level: "Advanced" },
  { id: "P5", name: "Vijay", level: "Intermediate" },
  { id: "P6", name: "Suresh", level: "Beginner" },
  { id: "P7", name: "Manoj", level: "Advanced" },
  { id: "P8", name: "Nithin", level: "Intermediate" },
];

export const initialBookings = [
  {
    id: "BK-1001",
    courtId: "C1",
    date: today,
    startTime: "06:00",
    endTime: "07:00",
    playerIds: ["P1", "P2", "P3", "P4"],
    status: "CONFIRMED",
  },
  {
    id: "BK-1002",
    courtId: "C2",
    date: today,
    startTime: "07:00",
    endTime: "08:00",
    playerIds: ["P5", "P6"],
    status: "CONFIRMED",
  },
  {
    id: "BK-1003",
    courtId: "C3",
    date: today,
    startTime: "08:00",
    endTime: "09:00",
    playerIds: ["P7", "P8"],
    status: "CONFIRMED",
  },
  {
    id: "BK-1004",
    courtId: "C1",
    date: today,
    startTime: "17:00",
    endTime: "18:00",
    playerIds: ["P1", "P5", "P7", "P8"],
    status: "CONFIRMED",
  },
];
