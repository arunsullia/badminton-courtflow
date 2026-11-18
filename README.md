# CourtFlow – Badminton Court Booking App

https://badminton-courtflow.vercel.app/

CourtFlow is a React-based badminton court booking and management application. It helps manage court reservations, players, and booking schedules through a simple dashboard.

## Features

- **Dashboard** – Overview of court bookings and booking status.
- **Booking Management** – Create, view, edit, and cancel bookings.
- **Player Management** – View registered players.
- **Search & Filter** – Search bookings by booking ID or court and filter by status.
- **Conflict Validation** – Prevent overlapping court reservations and player bookings.
- **Local Storage** – Persist booking data in the browser.
- **Responsive Layout** – Application layout built using CSS.

## Tech Stack

- React
- JavaScript
- Vite
- CSS
- Lucide React
- Browser Local Storage

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/arunsullia/badminton-courtflow.git
```

Navigate to the project directory:

```bash
cd badminton-courtflow
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

### Production Build

To create a production build:

```bash
npm run build
```

## Project Structure

```text
src/
├── components/
│   ├── common/
│   └── layout/
├── constants/
├── data/
├── features/
│   ├── bookings/
│   ├── dashboard/
│   └── players/
├── App.jsx
├── index.css
└── main.jsx
```

## Data Storage

The application currently uses browser Local Storage to persist booking information. No backend or database is required.

## Future Improvements

- Player creation, editing, and deletion.
- Calendar-based booking view.
- Booking notifications and confirmation dialogs.
- Backend API and database integration.
- Automated component and utility tests.

## Author

Developed as a React frontend engineering technical exercise.
