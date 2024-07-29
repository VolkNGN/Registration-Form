import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [submissionData, setSubmissionData] = useState(null);

  const onSubmit = data => {
    console.log(data);
    setSubmissionData(data);
    // Enregistrez les données dans le store ici
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <FormInput 
        label="Nom" 
        type="text" 
        name="lastName" 
        register={register} 
        required="Nom est requis" 
        error={errors.lastName}
      />
      <FormInput 
        label="Prénom" 
        type="text" 
        name="firstName" 
        register={register} 
        required="Prénom est requis" 
        error={errors.firstName}
      />
      <FormInput 
        label="Date de naissance" 
        type="date" 
        name="birthDate" 
        register={register} 
        required="Date de naissance est requise" 
        validate={validateAge} 
        error={errors.birthDate}
      />
      <FormInput 
        label="Email" 
        type="email" 
        name="email" 
        register={register} 
        required="Email est requis" 
        pattern={{
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Adresse email invalide"
        }} 
        error={errors.email}
      />
      <FormInput 
        label="Mot de passe" 
        type="password" 
        name="password" 
        register={register} 
        required="Mot de passe est requis" 
        minLength={{
          value: 8,
          message: "Le mot de passe doit contenir au moins 8 caractères"
        }} 
        error={errors.password}
      />
      <input type="submit" value="S'inscrire" className="submit-button" />
      {submissionData && <pre>{JSON.stringify(submissionData, null, 2)}</pre>}
    </form>
  );
};

export default RegistrationForm;
