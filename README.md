# VehiclePark

A full-stack vehicle rental booking application with a step-by-step form flow and robust backend API.

## Features

- **User-Friendly Booking Flow**: Step-by-step form guiding users through the vehicle selection and booking process
- **Vehicle Categories**: Filter vehicles by number of wheels (2 or 4)
- **Date Range Selection**: Choose booking start and end dates
- **Responsive UI**: Modern interface built with Material UI and TailwindCSS

## Tech Stack

### Frontend
- React
- Material UI
- TailwindCSS
- Axios
- Vite

### Backend
- Node.js
- Express
- Sequelize ORM
- SQLite Database

## Project Structure

```
VehiclePark/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # React context for state management
│   │   ├── services/      # API services for backend communication
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
│
├── backend/               # Node.js backend API
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # API controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── seeders/       # Database seeders
│   └── index.js           # Entry point for the backend server
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ItsRoy69/VehiclePark.git
   cd VehiclePark
   ```

2. Setup Backend:
   ```bash
   cd backend
   npm install
   npm run seed     # Populate database with initial data
   npm run dev      # Start development server
   ```

3. Setup Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev      # Start development server
   ```

4. Open your browser and navigate to:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## API Endpoints

### Vehicle Endpoints
- `GET /api/vehicles/types`: Get all vehicle types (can filter by wheels)
- `GET /api/vehicles/types/:typeId`: Get vehicles by type
- `GET /api/vehicles/:id`: Get a specific vehicle

### Booking Endpoints
- `POST /api/bookings`: Create a new booking
