import { useFormContext } from 'react-hook-form';

export default function StepOne() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="step-container">
      <div className="form-group">
        <label className="form-label" htmlFor="firstName">First Name</label>
        <input 
          id="firstName"
          type="text" 
          className="form-input" 
          placeholder="e.g. Jane"
          {...register('firstName')} 
        />
        {errors.firstName && <span className="error-text">{errors.firstName.message}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="lastName">Last Name</label>
        <input 
          id="lastName"
          type="text" 
          className="form-input" 
          placeholder="e.g. Doe"
          {...register('lastName')} 
        />
        {errors.lastName && <span className="error-text">{errors.lastName.message}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="dob">Date of Birth</label>
        <input 
          id="dob"
          type="date" 
          className="form-input" 
          {...register('dob')} 
        />
        {errors.dob && <span className="error-text">{errors.dob.message}</span>}
      </div>
    </div>
  );
}
