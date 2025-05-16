import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import { useFormContext } from "../context/FormContext";
import { fetchVehiclesByType } from "../services/api";

const VehicleModelForm = () => {
  const {
    formData,
    updateFormData,
    nextStep,
    prevStep,
    error,
    setError,
  } = useFormContext();
  const [vehicleId, setVehicleId] = useState(
    formData.vehicleId?.toString() || ""
  );
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        const vehiclesList = await fetchVehiclesByType(formData.vehicleTypeId);
        setVehicles(vehiclesList);
        console.log(
          "Vehicles loaded for type:",
          formData.vehicleTypeId,
          "Vehicles:",
          vehiclesList
        );
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch vehicles:", error);
        setError("Failed to load vehicles. Please try again.");
        setLoading(false);
      }
    };

    if (formData.vehicleTypeId) {
      loadVehicles();
    }
  }, [formData.vehicleTypeId, setError]);

  useEffect(() => {
    if (formData.vehicleId) {
      setVehicleId(formData.vehicleId.toString());
    }
  }, [formData.vehicleId]);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    setVehicleId(selectedId);

    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.id.toString() === selectedId
    );
    console.log("Vehicle model selected:", selectedVehicle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!vehicleId) {
      setError("Please select a vehicle model");
      return;
    }

    const vehicleIdNum = parseInt(vehicleId);
    const selectedVehicle = vehicles.find(
      (vehicle) => vehicle.id === vehicleIdNum
    );

    console.log("Submitting vehicle model:", selectedVehicle);

    updateFormData({
      vehicleId: vehicleIdNum,
    });

    nextStep();
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", maxWidth: 500, mx: "auto" }}
    >
      <Typography variant="h6" gutterBottom>
        Specific Model
      </Typography>

      {vehicles.length > 0 ? (
        <FormControl component="fieldset" sx={{ my: 2 }} error={!!error}>
          <FormLabel component="legend">Select a vehicle model</FormLabel>
          <RadioGroup value={vehicleId} onChange={handleChange}>
            {vehicles.map((vehicle) => (
              <FormControlLabel
                key={vehicle.id}
                value={vehicle.id.toString()}
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="body1">{vehicle.model}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {vehicle.description}
                    </Typography>
                  </Box>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      ) : (
        <Typography variant="body1" sx={{ my: 2 }}>
          No vehicles available for the selected type.
        </Typography>
      )}

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={prevStep}>
          Back
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
          disabled={vehicles.length === 0}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default VehicleModelForm;
