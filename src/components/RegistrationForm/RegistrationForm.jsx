import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitForm } from '../../FormSlice';

// Composant du formulaire d'inscription
const RegistrationForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const formData = useSelector(state => state.form.formData);
  const [submissionData, setSubmissionData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = data => {
    console.log(data);
    setSubmissionData(data);
    dispatch(submitForm(data));
    setIsSubmitted(true);
  };

  const validateAge = (dateString) => {
    const birthDate = new Date(dateString);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    const m = new Date().getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && new Date().getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18 || 'Vous devez avoir au moins 18 ans';
  };

  const password = watch("password", "");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label>Nom</label>
        <input 
          type="text"
          {...register("lastName", { required: "Nom est requis" })}
          className={errors.lastName ? 'input-error' : ''}
        />
        {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
      </div>
      <div className="form-group">
        <label>Prénom</label>
        <input 
          type="text"
          {...register("firstName", { required: "Prénom est requis" })}
          className={errors.firstName ? 'input-error' : ''}
        />
        {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
      </div>
      <div className="form-group">
        <label>Date de naissance</label>
        <input 
          type="date"
          {...register("birthDate", { 
            required: "Date de naissance est requise", 
            validate: validateAge 
          })}
          className={errors.birthDate ? 'input-error' : ''}
        />
        {errors.birthDate && <p className="error-message">{errors.birthDate.message}</p>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input 
          type="email"
          {...register("email", { 
            required: "Email est requis",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Adresse email invalide"
            }
          })}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
      </div>
      <div className="form-group tooltip">
        <label>Mot de passe</label>
        <input 
          type="password"
          {...register("password", { 
            required: "Mot de passe est requis",
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères"
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un symbole"
            }
          })}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
        <span className="tooltiptext">
          Doit contenir au moins une majuscule, une minuscule, un chiffre, un symbole et 8 caractères minimum.
        </span>
      </div>
      <div className="form-group">
        <label>Confirmer le mot de passe</label>
        <input 
          type="password"
          {...register("confirmPassword", { 
            required: "La confirmation du mot de passe est requise",
            validate: value => value === password || "Les mots de passe ne correspondent pas"
          })}
          className={errors.confirmPassword ? 'input-error' : ''}
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
      </div>
      <input type="submit" value="S'inscrire" className="submit-button" />
      {isSubmitted && <p className="success-message">Formulaire soumis avec succès !</p>}
    </form>
  );
};

export default RegistrationForm;
