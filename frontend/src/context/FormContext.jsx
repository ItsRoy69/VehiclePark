import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: null,
    vehicleTypeId: null,
    vehicleId: null,
    startDate: null,
    endDate: null,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateFormData = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    setError('');
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    setError('');
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      wheels: null,
      vehicleTypeId: null,
      vehicleId: null,
      startDate: null,
      endDate: null,
    });
    setCurrentStep(1);
    setError('');
    setSuccess(false);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        nextStep,
        prevStep,
        error,
        setError,
        loading,
        setLoading,
        success,
        setSuccess,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext; 