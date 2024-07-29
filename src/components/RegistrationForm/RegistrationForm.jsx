import React, { useState } from 'react';

const RegistrationForm = () => {
  // Déclaration de l'état pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // État pour gérer les erreurs de validation
  const [errors, setErrors] = useState({});
  // État pour gérer la soumission réussie du formulaire
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fonction pour gérer les changements dans les champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fonction de validation de l'âge
  const validateAge = (dateString) => {
    const birthDate = new Date(dateString);
    let age = new Date().getFullYear() - birthDate.getFullYear();
    const monthDifference = new Date().getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && new Date().getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18 || 'Vous devez avoir au moins 18 ans';
  };

  // Fonction de validation du mot de passe
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password) || 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole';
  };

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation des champs
    if (!formData.lastName) newErrors.lastName = "Nom est requis";
    if (!formData.firstName) newErrors.firstName = "Prénom est requis";
    if (!formData.birthDate) {
      newErrors.birthDate = "Date de naissance est requise";
    } else {
      const ageValidation = validateAge(formData.birthDate);
      if (ageValidation !== true) newErrors.birthDate = ageValidation;
    }
    if (!formData.email) {
      newErrors.email = "Email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Adresse email invalide";
    }
    if (!formData.password) {
      newErrors.password = "Mot de passe est requis";
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (passwordValidation !== true) newErrors.password = passwordValidation;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form Data:', formData);
      setIsSubmitted(true); // Affiche le message de validation
      // Enregistrez les données dans le store ici
    } else {
      setIsSubmitted(false); // Cache le message si des erreurs sont présentes
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="lastName">Nom</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={errors.lastName ? 'input-error' : ''}
        />
        {errors.lastName && <p className="error-message">{errors.lastName}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="firstName">Prénom</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={errors.firstName ? 'input-error' : ''}
        />
        {errors.firstName && <p className="error-message">{errors.firstName}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="birthDate">Date de naissance</label>
        <input
          type="date"
          name="birthDate"
          id="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className={errors.birthDate ? 'input-error' : ''}
        />
        {errors.birthDate && <p className="error-message">{errors.birthDate}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <div className="tooltip">
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'input-error' : ''}
          />
          <span className="tooltiptext">Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole</span>
        </div>
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? 'input-error' : ''}
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
      </div>

      <button type="submit" className="submit-button">S'inscrire</button>

      {isSubmitted && <p className="success-message">Les informations ont été soumises avec succès!</p>}
    </form>
  );
};

export default RegistrationForm;
