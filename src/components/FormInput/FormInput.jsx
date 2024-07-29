import React from 'react';

const FormInput = ({ label, type, name, register, required, pattern, validate, minLength, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input 
        type={type} 
        {...register(name, { required, pattern, validate, minLength })} 
        className={error ? 'input-error' : ''}
      />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
};

export default FormInput;
