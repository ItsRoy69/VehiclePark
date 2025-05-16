# Vehicle Rental Frontend

This is the frontend for the Vehicle Rental application, built with React, Material UI, and TailwindCSS.

## Project Structure

- `src/components`: React components for the application
- `src/context`: React context for state management
- `src/services`: API services for backend communication

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

## Form Flow

The application guides users through a step-by-step form with one question per screen:

1. **Name Form**: Collects the user's first and last name
2. **Wheels Form**: Allows selection of 2 or 4 wheels
3. **Vehicle Type Form**: Displays vehicle types based on the selected number of wheels
4. **Vehicle Model Form**: Shows specific vehicles for the selected type
5. **Date Range Form**: Lets users select booking dates and submit the booking

## Technologies Used

- React: UI library
- Material UI: Component library for UI elements
- TailwindCSS: Utility CSS framework
- Axios: HTTP client for API requests
