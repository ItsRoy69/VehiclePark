import { useState, useEffect } from 'react';
import { 
  Button, 
  Box, 
  Typography, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  FormControl, 
  FormLabel,
  CircularProgress
} from '@mui/material';
import { useFormContext } from '../context/FormContext';
import { fetchVehicleTypes } from '../services/api';

const VehicleTypeForm = () => {
  const { formData, updateFormData, nextStep, prevStep, error, setError } = useFormContext();
  const [vehicleTypeId, setVehicleTypeId] = useState(formData.vehicleTypeId?.toString() || '');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadVehicleTypes = async () => {
      try {
        setLoading(true);
        const types = await fetchVehicleTypes(formData.wheels);
        setVehicleTypes(types);
        console.log("Vehicle types loaded:", types);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch vehicle types:', error);
        setError('Failed to load vehicle types. Please try again.');
        setLoading(false);
      }
    };

    if (formData.wheels) {
      loadVehicleTypes();
    }
  }, [formData.wheels, setError]);

  useEffect(() => {
    if (formData.vehicleTypeId) {
      setVehicleTypeId(formData.vehicleTypeId.toString());
    }
  }, [formData.vehicleTypeId]);

  const handleChange = (e) => {
    const selectedTypeId = e.target.value;
    setVehicleTypeId(selectedTypeId);
    
    // Log the selected vehicle type
    const selectedType = vehicleTypes.find(type => type.id.toString() === selectedTypeId);
    console.log("Vehicle type selected:", selectedType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!vehicleTypeId) {
      setError('Please select a vehicle type');
      return;
    }
    
    // Update context
    const vehicleTypeIdNum = parseInt(vehicleTypeId);
    const selectedType = vehicleTypes.find(type => type.id === vehicleTypeIdNum);
    
    console.log("Submitting vehicle type:", selectedType);
    
    updateFormData({
      vehicleTypeId: vehicleTypeIdNum,
      // Reset dependent field when type changes
      vehicleId: null
    });
    
    // Go to next step
    nextStep();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>
        Type of vehicle
      </Typography>
      
      {vehicleTypes.length > 0 ? (
        <FormControl component="fieldset" sx={{ my: 2 }} error={!!error}>
          <FormLabel component="legend">Select the type of vehicle</FormLabel>
          <RadioGroup 
            value={vehicleTypeId} 
            onChange={handleChange}
          >
            {vehicleTypes.map((type) => (
              <FormControlLabel 
                key={type.id} 
                value={type.id.toString()} 
                control={<Radio />} 
                label={type.name} 
              />
            ))}
          </RadioGroup>
        </FormControl>
      ) : (
        <Typography variant="body1" sx={{ my: 2 }}>
          No vehicle types available for the selected number of wheels.
        </Typography>
      )}
      
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={prevStep}>
          Back
        </Button>
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
          disabled={vehicleTypes.length === 0 || !vehicleTypeId}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default VehicleTypeForm; 