import { useFormContext } from 'react-hook-form';

export default function StepThree() {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="step-container">
      <div className="summary-container">
        <div className="summary-item">
          <span className="summary-label">First Name</span>
          <span className="summary-value">{values.firstName}</span>
        </div>
        
        <div className="summary-item">
          <span className="summary-label">Last Name</span>
          <span className="summary-value">{values.lastName}</span>
        </div>
        
        <div className="summary-item">
          <span className="summary-label">Date of Birth</span>
          <span className="summary-value">{values.dob}</span>
        </div>
        
        <div className="summary-item">
          <span className="summary-label">Email</span>
          <span className="summary-value">{values.email}</span>
        </div>
      </div>
      <p className="wizard-subtitle" style={{ marginTop: '1.5rem', marginBottom: 0 }}>
        Please review your details. Click Submit to finalize.
      </p>
    </div>
  );
}
