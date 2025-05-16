import { CssBaseline, ThemeProvider, createTheme, Typography, Box } from '@mui/material';
import { FormProvider } from './context/FormContext';
import FormContainer from './components/FormContainer';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100%', textAlign: 'center', py: 3 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Vehicle Rental Booking
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Book your vehicle by filling out the step-by-step form below
        </Typography>
      </Box>
      <FormProvider>
        <FormContainer />
      </FormProvider>
    </ThemeProvider>
  );
}

export default App;
