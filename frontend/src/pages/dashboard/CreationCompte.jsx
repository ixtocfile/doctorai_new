import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

function CreationCompte() {
    const [errors, setErrors] = useState({}); 
    const initialFormState = {
        user_company: '',
        user_function: '',
        user_firstname: '', 
        user_lastname: '',
        user_email: '', 
        user_password: ''
    }; 
    const [formFields, setFormFields] = useState(initialFormState);
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU1MjQ0Mzl9.c00hprgt70vW5x6aK8Co2x7lED6Mg1-I28LfBWodlD4'; //user 4 client
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU1MjQ2NTR9.p9YHsCuCDEMwFJAyltDdL8-6zHOMhOSHjnEVmyPwvdQ' //user 7 admin
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields(prevState => ({
            ...prevState,
            [name]: value
          }));
      };

    // valide le formulaire avant la soumission
    const validateForm = () => {
        let formErrors = {};
        let isValid = true;
    
        if (!formData.user_company) {
          formErrors.user_company = 'Le champ "Société" est requis';
          isValid = false;
        }
    
        if (!formData.user_function) {
            formErrors.user_function = 'Le champ "Poste" est requis';
            isValid = false;
        }

        if (!formData.user_firstname) {
          formErrors.user_firstname = 'Le champ "Prénom" est requis';
          isValid = false;
        }
    
        if (!formData.user_lastname) {
          formErrors.user_lastname = 'Le champ "Nom" est requis';
          isValid = false;
        }
    
        if (!formData.user_email) {
          formErrors.user_email = 'Le champ "Adresse email" est requis';
          isValid = false;
        }
    
        if (!formData.user_password) {
          formErrors.user_password = 'Le champ "Mot de passe" est requis';
          isValid = false;
        }
    
        setErrors(formErrors);
        return isValid;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          console.log('Form data being sent:', formFields);
    
          // Send a POST request with Authorization: Bearer token
          const response = await axios.post('http://localhost:3000/api/v1/users', formFields, {
            headers: {
              Authorization: `Bearer ${token}`, 
              'Content-Type': 'application/json',
            },
          });

            console.log('Success:', response.data);
            alert('Invitation envoyée avec succès !');
           
            setFormFields(initialFormState);

        } catch (error) {
          console.error('Error creating user:', error);
          alert('Erreur lors de la création de l\'utilisateur.');
        }
      };
    
    return (
        <div className="w-full h-screen flex sm:flex-row flex-col">
            <Sidebar/>
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <div className="w-full h-full">
                    <h3 className="font-bold text-xl mb-2">Création Compte Client</h3>
                    <div className="bg-white p-8 rounded shadow w-full ">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                <label htmlFor="user_company" className="block text-sm font-medium text-gray-700">
                                    Société
                                </label>
                                <input
                                    type="text"
                                    id="user_company"
                                    name="user_company"
                                    value={formFields.user_company}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                                {errors.user_company && <p className="text-red-500 text-sm">{errors.user_company}</p>}
                                </div>
                                <div>
                                <label htmlFor="user_function" className="block text-sm font-medium text-gray-700">
                                    Poste
                                </label>
                                <input
                                    type="text"
                                    id="user_function"
                                    name="user_function"
                                    value={formFields.user_function}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                                {errors.user_function && <p className="text-red-500 text-sm">{errors.user_function}</p>}
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label for="user_firstname" className="block text-sm font-medium text-gray-700">Prénom</label>
                                    <input
                                        type="text"
                                        id="user_firstname"
                                        name="user_firstname"
                                        value={formFields.user_firstname}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                    {errors.user_firstname && <p className="text-red-500 text-sm">{errors.user_firstname}</p>}
                                </div>
                                <div>
                                    <label for="user_lastname" className="block text-sm font-medium text-gray-700">Nom</label>
                                    <input
                                        type="text"
                                        id="user_lastname"
                                        name="user_lastname"
                                        value={formFields.user_lastname}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                    {errors.user_lastname && <p className="text-red-500 text-sm">{errors.user_lastname}</p>}
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label for="user_email" className="block text-sm font-medium text-gray-700">Adresse email</label>
                                    <input
                                        type="email"
                                        id="user_email"
                                        name="user_email"
                                        value={formFields.user_email}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                    {errors.user_email && <p className="text-red-500 text-sm">{errors.user_email}</p>}
                                </div>
                                <div>
                                    <label for="user_password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                                    <input
                                        type="password"
                                        id="user_password"
                                        name="user_password"
                                        value={formFields.user_password}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                    {errors.user_password && <p className="text-red-500 text-sm">{errors.user_password}</p>}
                                </div>
                            </div>

                            <div className="mt-6">
                                <button type="submit" className=" p-3 bg-sky-950 text-white rounded-md hover:bg-blue-600">Envoyer Invitation</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreationCompte;