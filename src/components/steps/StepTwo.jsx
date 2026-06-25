import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

export default function StepTwo() {
  const { register, formState: { errors } } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="step-container">
      <div className="form-group">
        <label className="form-label" htmlFor="email">Email</label>
        <input 
          id="email"
          type="email" 
          className="form-input" 
          placeholder="name@company.com"
          {...register('email')} 
        />
        {errors.email && <span className="error-text">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password">Password</label>
        <div className="password-wrapper">
          <input 
            id="password"
            type={showPassword ? "text" : "password"} 
            className="form-input" 
            placeholder="Min. 8 characters"
            {...register('password')} 
          />
          <button 
            type="button" 
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <span className="error-text">{errors.password.message}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
        <div className="password-wrapper">
          <input 
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"} 
            className="form-input" 
            placeholder="Repeat password"
            {...register('confirmPassword')} 
          />
          <button 
            type="button" 
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword.message}</span>}
      </div>
    </div>
  );
}
