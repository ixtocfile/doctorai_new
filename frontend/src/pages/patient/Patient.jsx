import React, { useEffect, useState } from 'react';
import Sidebar from '../dashboard/Sidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import { TrashIcon, LockOpenIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom'; 

function Patient() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patientData, setPatientData] = useState({
        patient_id:id,
        patient_company: '', 
        patient_street: '', 
        patient_zipcode: '', 
        patient_city: '', 
        patient_country: '', 
        patient_description: '', 
        patient_startDate:'', 
        patient_endDate: '', 
        patient_contact_role: '', 
        patient_contact_firstname:'',
        patient_contact_lastname:'',
        patient_contact_email: '', 
        patient_country: '',
        patient_contact_phone: ''
    }); 
    const [error, setError] = useState(''); 
    const [isPatientEditable, setIsPatientEditable] = useState(false);
    
  //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU1MjQ0Mzl9.c00hprgt70vW5x6aK8Co2x7lED6Mg1-I28LfBWodlD4'; //user 4 client
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU1MjQ2NTR9.p9YHsCuCDEMwFJAyltDdL8-6zHOMhOSHjnEVmyPwvdQ' //user 7 admin

    const toggleEditPatient = async () => {
        if (isPatientEditable) {
            console.log("Before saving patientData:", patientData); 
            console.log("Toggle Patient User");
            // Save patient data when clicking the lock icon to disable editing
            try {
                await savePatientData();
                setIsPatientEditable(false); 
            } catch (error) {
                console.error('Error saving patient data:', error);
                setError('Error saving patient data');
            }
        } else {
            setIsPatientEditable(true);
        }
    };  

    //Get data from Patient Table
    const getPatientData = async (patient_id) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/patients/${patient_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            });
            setPatientData(response.data); 
            console.log('Success Patient Data:', response.data);
        } catch (error) {
            console.error("Error fetching patient data:", error);
            setError('Error fetching patient data'); 
        }
    };
      
    // Save the edited patient data
    const savePatientData = async () => {
        const updatedPatientData = {
            patient_firstname: patientData.patient_firstname || undefined,
            patient_lastname: patientData.patient_lastname || undefined,
            patient_gender: patientData.patient_gender || undefined,
            patient_dob: patientData.patient_dob || undefined,
            patient_email: patientData.patient_email || undefined,
            patient_phone: patientData.patient_phone ? String(patientData.patient_phone) : undefined,
            patient_street: patientData.patient_street || undefined,
            patient_zipcode: patientData.patient_zipcode || undefined,
            patient_city: patientData.patient_city || undefined,
            patient_country: patientData.patient_country || undefined,
            patient_emergency_contact_name: patientData.patient_emergency_contact_name || undefined,
            patient_emergency_contact_phone: patientData.patient_emergency_contact_phone ? String(patientData.patient_emergency_contact_phone) : undefined,
            patient_medical_record_number: patientData.patient_medical_record_number || undefined,
            patient_blood_type: patientData.patient_blood_type || undefined,
            patient_allergies: patientData.patient_allergies || undefined,
            patient_medications: patientData.patient_medications || undefined,
            patient_primary_care_physician: patientData.patient_primary_care_physician || undefined,
            patient_insurance_provider: patientData.patient_insurance_provider || undefined,
            patient_insurance_policy_number: patientData.patient_insurance_policy_number || undefined
        };
      
        try {
          const response = await axios.patch(
            `http://localhost:3000/api/v1/patients/${patientData.patient_id}`,
            updatedPatientData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('Success:', response.data);
        } catch (error) {
          console.error('Error saving patient data:', error);
        }
    };
    const PatientForm = ({ patientData, setPatientData, isPatientEditable }) => {
        return (
            <form>
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { id: "patient_dob", label: "Date of Birth", type: "date" },
                        { id: "patient_email", label: "Email", type: "email" },
                        { id: "patient_phone", label: "Phone", type: "text" },
                        { id: "patient_street", label: "Street", type: "text" },
                        { id: "patient_zipcode", label: "Zip Code", type: "text" },
                        { id: "patient_city", label: "City", type: "text" },
                        { id: "patient_country", label: "Country", type: "text" },
                        { id: "patient_emergency_contact_name", label: "Emergency Contact Name", type: "text" },
                        { id: "patient_emergency_contact_phone", label: "Emergency Contact Phone", type: "text" },
                        { id: "patient_blood_type", label: "Blood Type", type: "text" },
                        { id: "patient_allergies", label: "Allergies", type: "text" },
                        { id: "patient_medications", label: "Medications", type: "text" },
                        { id: "patient_primary_care_physician", label: "Primary Care Physician", type: "text" },
                        { id: "patient_insurance_provider", label: "Insurance Provider", type: "text" },
                        { id: "patient_insurance_policy_number", label: "Insurance Policy Number", type: "text" }
                    ].map(({ id, label, type }) => (
                        <div key={id}>
                            <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                            <input
                                type={type}
                                id={id}
                                name={id}
                                value={patientData ? patientData[id] || '' : ''}
                                onChange={(e) => setPatientData({ ...patientData, [id]: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md"
                                disabled={!isPatientEditable}
                            />
                        </div>
                    ))}
                </div>
            </form>
        );
    };
    
      
    useEffect(() => {
        getPatientData(patientData.patient_id);
    }, []); 

    return (
        <div className="w-full h-screen flex sm:flex-row flex-col">
            <Sidebar/>
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <div className="w-full h-128 overflow-auto">
                    <div className='flex flex-row py-4'>
                        <h3 className="font-bold text-xl mr-4">Patient ID: {patientData ? patientData.patient_id : ''}</h3>
                                <h3 className="font-bold text-xl mr-4">{patientData ? patientData.patient_firstname: ''}</h3>
                                <h3 className="font-bold text-xl mr-4">{patientData ? (patientData.patient_lastname) : ''}</h3>
                                <h3 className="font-bold text-xl mr-4">({patientData ? patientData.patient_gender : ''})</h3>
                                <h3 className="font-bold text-xl mr-4">SS: {patientData ? patientData.patient_medical_record_number : ''}</h3>
                                <button type="button" onClick={toggleEditPatient}>
                                    {isPatientEditable ? (
                                        <LockOpenIcon className="size-6 text-sky-300" />
                                    ) : (
                                        <PencilSquareIcon className="size-6 text-zinc-400" />
                                    )}
                                </button>
                    </div>
                
                    <div className="bg-white p-4 rounded shadow w-full">
                    <PatientForm patientData={patientData} setPatientData={setPatientData} isPatientEditable={isPatientEditable}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Patient;