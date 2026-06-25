import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ProgressIndicator from './ProgressIndicator';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';

// Phase 3: Zod Schema Definition
const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Invalid email address (must contain @ and valid domain)'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password')
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export default function RegistrationWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Initialize RHF with Zod resolver
  // mode: 'onChange' fulfills Phase 2 Real-Time Validation requirement
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const { handleSubmit, trigger, watch, formState: { errors } } = methods;

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ['firstName', 'lastName', 'dob'];
    if (step === 2) fieldsToValidate = ['email', 'password', 'confirmPassword'];

    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = (data) => {
    console.log("Final Registration Payload:", data);
    setIsSubmitted(true);
  };

  // Logic to dynamically disable Next button
  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const dob = watch('dob');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const isStep1Valid = firstName.length > 0 && lastName.length > 0 && dob.length > 0 && 
                      !errors.firstName && !errors.lastName && !errors.dob;
  
  const isStep2Valid = email.includes('@') && password.length >= 8 && confirmPassword === password && 
                      !errors.email && !errors.password && !errors.confirmPassword;

  const isNextDisabled = (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid);

  if (isSubmitted) {
    return (
      <div className="wizard-card">
        <h2 className="wizard-title">Success!</h2>
        <p className="success-message">Your registration is complete.</p>
        <p className="wizard-subtitle" style={{marginTop: '1rem'}}>Check the console for the submitted payload.</p>
      </div>
    );
  }

  return (
    <div className="wizard-card">
      <h1 className="wizard-title">Registration</h1>
      <p className="wizard-subtitle">Create your new account</p>

      <ProgressIndicator currentStep={step} totalSteps={3} />

      {/* Phase 3: RHF FormProvider replaces standard useState lifting */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}
          {step === 3 && <StepThree />}

          <div className="button-group">
            {step > 1 && (
              <button 
                type="button" 
                onClick={handleBack} 
                className="btn btn-secondary"
              >
                Back
              </button>
            )}
            
            {step < 3 ? (
              <button 
                type="button" 
                onClick={handleNext} 
                className="btn btn-primary"
                disabled={isNextDisabled}
              >
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
