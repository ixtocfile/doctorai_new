import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Datepicker from "react-tailwindcss-datepicker";
import axios from 'axios';

function CreationDemande() {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const initialFormState = {
        user_function: '',
        user_firstname: '', 
        user_lastname: '',
        user_email: '',
        user_phone:'', 
        user_street: '',
        user_zipcode:'', 
        user_city: '',
        user_country: '',

        mission_company: '',
        mission_street: '', 
        mission_zipcode: '', 
        mission_city: '', 
        mission_country:'',
        mission_contact_role: '', 
        mission_contact_firstname: '', 
        mission_contact_lastname: '', 
        mission_contact_phone: '', 
        mission_contact_email: '',
        mission_description: '',
        mission_startDate: '',
        mission_endDate: ''
    }; 
    const [errors, setErrors] = useState({}); 

    const [formFields, setFormFields] = useState(initialFormState);
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU1MjQ0Mzl9.c00hprgt70vW5x6aK8Co2x7lED6Mg1-I28LfBWodlD4'; //user 4 client
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU1MjQ2NTR9.p9YHsCuCDEMwFJAyltDdL8-6zHOMhOSHjnEVmyPwvdQ' //user 7 admin
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log(`Field name: ${name}, Value: ${value}`)
        setFormFields(prevState => ({
            ...prevState,
            [name]: value
          }));
    };

    //Prise en compte des dates
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
        setFormFields((prevState) => ({
            ...prevState,
            mission_startDate: newValue.startDate,
            mission_endDate: newValue.endDate,
        }));
    }

    // valide le formulaire avant la soumission
    const validateForm = () => {
        let formErrors = {};
        let isValid = true;
    
        //User
        if (!formFields.user_function) {
          formErrors.user_function = 'Le champ "Poste du Sous-Traitant" est requis';
          isValid = false;
        }

        if (!formFields.user_firstname) {
          formErrors.user_firstname = 'Le champ "Prénom du Sous-Traitant" est requis';
          isValid = false;
        }
    
        if (!formFields.user_lastname) {
          formErrors.user_lastname = 'Le champ "Nom du Sous-Traitant" est requis';
          isValid = false;
        }
    
        if (!formFields.user_email) {
          formErrors.user_email = 'Le champ "Adresse email du Sous-Traitant" est requis';
          isValid = false;
        }

        if (!formFields.user_phone) {
            formErrors.user_phone = 'Le champ "Téléphone du Sous-Traitant" est requis';
            isValid = false;
        }

        if (!formFields.user_street) {
            formErrors.user_street = 'Le champ "Adresse du Sous-Traitant" est requis';
            isValid = false;
        }

        if (!formFields.user_zipcode) {
            formErrors.user_zipcode = 'Le champ "Code Postal du Sous-Traitant" est requis';
            isValid = false;
        }

        if (!formFields.user_city) {
            formErrors.user_city = 'Le champ "Ville du Sous-Traitant" est requis';
            isValid = false;
        }

        if (!formFields.user_country) {
            formErrors.user_country = 'Le champ "Pays du Sous-Traitant" est requis';
            isValid = false;
        }
    
        // Mission
        if (!formFields.mission_company) {
          formErrors.mission_company = 'Le champ "Nom de la mission" est requis';
          isValid = false;
        }

        if (!formFields.mission_street) {
          formErrors.mission_street = 'Le champ "Adress" est requis';
          isValid = false;
        }

         if (!formFields.mission_zipcode) {
          formErrors.mission_zipcode = 'Le champ "Zipcode" est requis';
          isValid = false;
        }

        if (!formFields.mission_country) {
          formErrors.mission_country = 'Le champ "Pays" est requis';
          isValid = false;
        }

        if (!formFields.mission_contact_role) {
          formErrors.mission_contact_role = 'Le champ "Role Contact" est requis';
          isValid = false;
        }

         if (!formFields.mission_contact_firstname) {
          formErrors.mission_contact_firstname = 'Le champ "Prénom contact" est requis';
          isValid = false;
        }

        if (!formFields.mission_contact_lastname) {
          formErrors.mission_contact_lastname = 'Le champ "Nom contact" est requis';
          isValid = false;
        }

        if (!formFields.mission_contact_email) {
          formErrors.mission_contact_email = 'Le champ "Contact email" est requis';
          isValid = false;
        }

        if (!formFields.mission_contact_phone) {
          formErrors.mission_contact_phone = 'Le champ "Contact phone" est requis';
          isValid = false;
        }
  
        if (!formFields.mission_description) {
        formErrors.mission_description = 'Le champ "Description de la Mission" est requis';
        isValid = false;
        }

        if (!formFields.mission_startDate) {
        formErrors.mission_startDate = 'Le champ "Date de Début de la Mission" est requis';
        isValid = false;
        }

        if (!formFields.mission_endDate) {
        formErrors.mission_endDate = 'Le champ "Date de Fin de la Mission" est requis';
        isValid = false;
        }
       
        setErrors(formErrors);
        return isValid;
      }; 

      const cleanData = (data) => {
        return Object.fromEntries(
            Object.entries(data).filter(([key, value]) => key && value !== '')
        );
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validation du formulaire
        const isValid = validateForm();
        if (!isValid) {
            console.log("Form is invalid", errors);
            return;
        }

        // Conversion des dates
        const dataToSend = cleanData({
            ...formFields,
            mission_startDate: value.startDate,
            mission_endDate: value.endDate
        });
    
        // Requête création demande
        try {
            const response = await axios.post('http://localhost:3000/api/v1/requests', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log('Full response Creation demande:', response);
            alert('Invitation envoyée avec succès !');
            setFormFields(initialFormState);
        } catch (error) {
            console.error('Error creating request:', error);
            alert('Erreur lors de la création de la demande.');
        }
    };
    
    return (
        <div className="w-full h-screen flex sm:flex-row flex-col">
            <Sidebar/>
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <div className="w-full h-128 overflow-auto">
                    <h3 className="font-bold text-xl mb-2">Création Nouvelle Demande</h3>
                    <div className="bg-white p-6 rounded shadow w-full">
    
                        <form onSubmit={handleSubmit}>

                            <h2 className="font-bold text-l pb-4">Informations sur le Sous-traitant</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label for="user_function" className="block text-sm font-medium text-gray-700">Poste</label>
                                    <input 
                                        type="text" 
                                        id="user_function" 
                                        name="user_function" 
                                        value={formFields.user_function}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
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
                                </div>
                                <div>
                                    <label for="user_phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                                    <input 
                                        type="number" 
                                        id="user_phone" 
                                        name="user_phone" 
                                        value={formFields.user_phone}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label for="user_street" className="block text-sm font-medium text-gray-700">Adresse</label>
                                    <input 
                                        type="text" 
                                        id="user_street" 
                                        name="user_street" 
                                        value={formFields.user_street}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label for="user_zipcode" className="block text-sm font-medium text-gray-700">Code Postal</label>
                                    <input 
                                        type="number" 
                                        id="user_zipcode" 
                                        name="user_zipcode" 
                                        value={formFields.user_zipcode}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label for="user_city" className="block text-sm font-medium text-gray-700">Ville</label>
                                    <input 
                                        type="text" 
                                        id="user_city" 
                                        name="user_city" 
                                        value={formFields.user_city}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label for="user_country" className="block text-sm font-medium text-gray-700">Pays</label>
                                    <input 
                                        type="text" 
                                        id="user_country" 
                                        name="user_country" 
                                        value={formFields.user_country}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                            </div>

                            <h2 className="font-bold text-l pt-8">Informations sur la Mission</h2>

                            <h2 className="font-medium text-m pt-2">Lieu de la Mission</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label for="mission_company" className="block text-sm font-medium text-gray-700">Nom de la Mission / Entreprise</label>
                                    <input 
                                        type="text" 
                                        id="mission_company" 
                                        name="mission_company" 
                                        value={formFields.mission_company}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label for="mission_street" className="block text-sm font-medium text-gray-700">Adresse</label>
                                    <input 
                                        type="text" 
                                        id="mission_street" 
                                        name="mission_street" 
                                        value={formFields.mission_street}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label for="mission_zipcode" className="block text-sm font-medium text-gray-700">Code Postal</label>
                                    <input 
                                        type="text" 
                                        id="mission_zipcode" 
                                        name="mission_zipcode" 
                                        value={formFields.mission_zipcode}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label for="mission_city" className="block text-sm font-medium text-gray-700">Ville</label>
                                    <input 
                                        type="text" 
                                        id="mission_city" 
                                        name="mission_city" 
                                        value={formFields.mission_city}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label for="mission_country" className="block text-sm font-medium text-gray-700">Pays</label>
                                    <input 
                                        type="text" 
                                        id="mission_country" 
                                        name="mission_country" 
                                        value={formFields.mission_country}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                            </div>

                            <h2 className="font-medium text-m pt-2">Détails de la Mission</h2>

                            <div>
                                <label for="mission_description" className="block text-sm font-medium text-gray-700">Description </label>
                                <textarea
                                    id='mission_description' 
                                    rows="3" 
                                    name='mission_description' 
                                    value={formFields.mission_description}
                                    onChange={handleChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>

                            <div className="mt-4 grid grid-cols-4 gap-4">
                                <div>
                                    <label htmlFor="mission_startDate" className="block text-sm font-medium text-gray-700">Dates de la Mission</label>
                                    <Datepicker value={value} onChange={handleValueChange} />
                                </div>
                                <div>
                                    <label for="mission_contact_role" className="block text-sm font-medium text-gray-700">Poste du Contact Mission</label>
                                    <input 
                                        type="text" 
                                        id="mission_contact_role" 
                                        name="mission_contact_role" 
                                        value={formFields.mission_contact_role}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label for="mission_contact_firstname" className="block text-sm font-medium text-gray-700">Prénom</label>
                                    <input 
                                        type="text" 
                                        id="mission_contact_firstname" 
                                        name="mission_contact_firstname" 
                                        value={formFields.mission_contact_firstname}
                                        onChange={handleChange}
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label for="mission_contact_lastname" className="block text-sm font-medium text-gray-700">Nom</label>
                                    <input 
                                        type="text" 
                                        id="mission_contact_lastname" 
                                        name="mission_contact_lastname"
                                        value={formFields.mission_contact_lastname}
                                        onChange={handleChange} 
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label for="mission_contact_email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input 
                                        type="email" 
                                        id="mission_contact_email" 
                                        name="mission_contact_email"
                                        value={formFields.mission_contact_email}
                                        onChange={handleChange} 
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                                <div>
                                    <label for="mission_contact_phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                                    <input 
                                        type="number" 
                                        id="mission_contact_phone" 
                                        name="mission_contact_phone" 
                                        value={formFields.mission_contact_phone}
                                        onChange={handleChange} 
                                        className="mt-1 p-2 w-full border rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <button type="submit" className=" p-3 bg-sky-950 text-white rounded-md hover:bg-blue-600">Envoyer Demande</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreationDemande;