# Vehicle Rental Backend

This is the backend API for the Vehicle Rental application, built with Node.js, Express, and Sequelize ORM with SQLite database.

## Project Structure

- `src/config`: Database configuration
- `src/controllers`: API controllers
- `src/models`: Database models
- `src/routes`: API routes
- `src/seeders`: Database seeders

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Seed the database:
   ```
   npm run seed
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Vehicle Endpoints

- `GET /api/vehicles/types`: Get all vehicle types (can filter by wheels)
- `GET /api/vehicles/types/:typeId`: Get vehicles by type
- `GET /api/vehicles/:id`: Get a specific vehicle

### Booking Endpoints

- `POST /api/bookings`: Create a new booking

## Database Schema

### VehicleType

- id (Primary Key)
- name (String, unique)
- wheels (Integer)

### Vehicle

- id (Primary Key)
- model (String)
- typeId (Foreign Key to VehicleType)
- description (Text)

### Booking

- id (Primary Key)
- firstName (String)
- lastName (String)
- vehicleId (Foreign Key to Vehicle)
- startDate (Date)
- endDate (Date)
