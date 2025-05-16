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
} from "@mui/material";
import { useFormContext } from "../context/FormContext";

const WheelsForm = () => {
  const {
    formData,
    updateFormData,
    nextStep,
    prevStep,
    error,
    setError,
  } = useFormContext();
  const [wheels, setWheels] = useState(formData.wheels?.toString() || "");

  useEffect(() => {
    if (formData.wheels) {
      setWheels(formData.wheels.toString());
    }
  }, [formData.wheels]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!wheels) {
      setError("Please select the number of wheels");
      return;
    }

    updateFormData({
      wheels: parseInt(wheels),
      vehicleTypeId: null,
      vehicleId: null,
    });
    nextStep();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", maxWidth: 500, mx: "auto" }}
    >
      <Typography variant="h6" gutterBottom>
        Number of wheels
      </Typography>

      <FormControl component="fieldset" sx={{ my: 2 }} error={!!error}>
        <FormLabel component="legend">Select the number of wheels</FormLabel>
        <RadioGroup value={wheels} onChange={(e) => setWheels(e.target.value)}>
          <FormControlLabel value="2" control={<Radio />} label="2 wheels" />
          <FormControlLabel value="4" control={<Radio />} label="4 wheels" />
        </RadioGroup>
      </FormControl>

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
          disabled={!wheels}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default WheelsForm;
