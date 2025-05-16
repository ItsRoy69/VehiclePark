import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useFormContext } from "../context/FormContext";

const NameForm = () => {
  const {
    formData,
    updateFormData,
    nextStep,
    error,
    setError,
  } = useFormContext();
  const [localFirst, setLocalFirst] = useState(formData.firstName);
  const [localLast, setLocalLast] = useState(formData.lastName);

  useEffect(() => {
    setLocalFirst(formData.firstName);
    setLocalLast(formData.lastName);
  }, [formData.firstName, formData.lastName]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!localFirst.trim() || !localLast.trim()) {
      setError("Both first name and last name are required");
      return;
    }

    updateFormData({
      firstName: localFirst.trim(),
      lastName: localLast.trim(),
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
        First, What's your name ?
      </Typography>

      <TextField
        label="First Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={localFirst}
        onChange={(e) => setLocalFirst(e.target.value)}
        error={error && !localFirst.trim()}
      />

      <TextField
        label="Last Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={localLast}
        onChange={(e) => setLocalLast(e.target.value)}
        error={error && !localLast.trim()}
      />

      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Button 
        type="submit" 
        variant="contained" 
        color="inherit"
        fullWidth
        sx={{ mt: 2, bgcolor: 'black', color: 'white', '&:hover': { bgcolor: '#333' } }}
        disabled={!localFirst.trim() || !localLast.trim()}
      >
        Next
      </Button>
    </Box>
  );
};

export default NameForm;
