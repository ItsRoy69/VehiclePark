import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useFormContext } from "../context/FormContext";
import { createBooking } from "../services/api";

const DateRangeForm = () => {
  const {
    formData,
    updateFormData,
    prevStep,
    error,
    setError,
    loading: contextLoading,
    setLoading: setContextLoading,
    success,
    setSuccess,
  } = useFormContext();

  const [startDate, setStartDate] = useState(
    formData.startDate
      ? new Date(formData.startDate).toISOString().split("T")[0]
      : ""
  );
  const [endDate, setEndDate] = useState(
    formData.endDate
      ? new Date(formData.endDate).toISOString().split("T")[0]
      : ""
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    console.log("Date form loaded with form data:", formData);
  }, []);

  useEffect(() => {
    if (formData.startDate) {
      setStartDate(new Date(formData.startDate).toISOString().split("T")[0]);
    }
    if (formData.endDate) {
      setEndDate(new Date(formData.endDate).toISOString().split("T")[0]);
    }
  }, [formData.startDate, formData.endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError("Both start date and end date are required");
      return;
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (parsedEndDate <= parsedStartDate) {
      setError("End date must be after start date");
      return;
    }

    updateFormData({
      startDate: parsedStartDate,
      endDate: parsedEndDate,
    });

    try {
      setSubmitting(true);
      setContextLoading(true);
      setError("");

      const bookingData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        vehicleId: formData.vehicleId,
        startDate: parsedStartDate,
        endDate: parsedEndDate,
      };

      console.log("Submitting booking with complete details:", {
        ...bookingData,
        wheels: formData.wheels,
        vehicleTypeId: formData.vehicleTypeId,
      });

      await createBooking(bookingData);
      console.log("Booking successfully created!");
      setSuccess(true);
      setSubmitting(false);
      setContextLoading(false);
    } catch (error) {
      console.error("Failed to create booking:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create booking. Please try again."
      );
      setSubmitting(false);
      setContextLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", maxWidth: 500, mx: "auto" }}
    >
      <Typography variant="h6" gutterBottom>
        Select your booking dates
      </Typography>

      {!success ? (
        <>
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            error={error && !startDate}
            disabled={submitting}
          />

          <TextField
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            error={error && !endDate}
            disabled={submitting}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={prevStep} disabled={submitting}>
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
              disabled={submitting || !startDate || !endDate}
            >
              {submitting ? <CircularProgress size={24} /> : "Book Now"}
            </Button>
          </Box>
        </>
      ) : (
        <Alert severity="success" sx={{ my: 2 }}>
          Your booking has been successfully created! Thank you.
        </Alert>
      )}
    </Box>
  );
};

export default DateRangeForm;
