import { Paper, Box, Stepper, Step, StepLabel, Container } from "@mui/material";
import { useFormContext } from "../context/FormContext";
import NameForm from "./NameForm";
import WheelsForm from "./WheelsForm";
import VehicleTypeForm from "./VehicleTypeForm";
import VehicleModelForm from "./VehicleModelForm";
import DateRangeForm from "./DateRangeForm";

const steps = [
  "Your Name",
  "Number of Wheels",
  "Vehicle Type",
  "Specific Model",
  "Booking Dates",
];

const FormContainer = () => {
  const { currentStep } = useFormContext();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <NameForm />;
      case 2:
        return <WheelsForm />;
      case 3:
        return <VehicleTypeForm />;
      case 4:
        return <VehicleModelForm />;
      case 5:
        return <DateRangeForm />;
      default:
        return <NameForm />;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Stepper activeStep={currentStep - 1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>

          <Box sx={{ mt: 4 }}>{renderStep()}</Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default FormContainer;
