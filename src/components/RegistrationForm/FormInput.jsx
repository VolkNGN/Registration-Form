import React from 'react';

// Composant FormInput pour les champs de formulaire
const FormInput = ({ label, type, name, register, required, pattern, validate, minLength, error }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      name={name}
      {...register(name, { required, pattern, validate, minLength })}
      className={error ? 'input-error' : ''}
    />
    {error && <p className="error-message">{error.message}</p>}
  </div>
);

export default FormInput;
