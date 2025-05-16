import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchVehicleTypes = async (wheels) => {
  try {
    const response = await api.get('/vehicles/types', {
      params: wheels ? { wheels } : {},
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchVehiclesByType = async (typeId) => {
  try {
    const response = await api.get(`/vehicles/types/${typeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api; 