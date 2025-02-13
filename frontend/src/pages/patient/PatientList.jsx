import React, { useEffect, useState } from 'react';
import Sidebar from '../dashboard/Sidebar';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

function PatientList() {
    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/patients');
        //     const filteredData = response.data.filter(item => 
        //       item.patient_status === 'En Attente' 
        //   );
          setData(response.data);
          console.log("Filtered Data:", response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        getData();
      }, []); 
    
        return (
        <div className="w-full h-screen flex sm:flex-row flex-col">
            <Sidebar/>
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <div className="w-full h-full">
                    <h3 className="font-bold text-xl mb-2">Liste des patients</h3>
                    {data.length === 0 ? (
                         <p>Pas de patients</p>
                    ) : (data.map((patient) => (
                    <div key={patient.patient_id} className="bg-stone-50 mb-2 shadow-xl shadow-gray-100 w-full flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 rounded-md">
                        <div>
                            <h3 className="font-bold mt-px">Dossier de {patient.patient_firstname} {patient.patient_lastname} - {patient.patient_medical_record_number
                            }</h3>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="bg-cyan-100 text-cyan-700 rounded-full px-3 py-1 text-sm">{patient.patient_status}</span>
                                <span className="text-slate-600 text-sm flex gap-1 items-center"> Né le : {new Date(patient.patient_dob).toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                            </div>
                        </div>
                        <div>
                            <Link to={`/patient/${patient.patient_id}`}>
                                <button className="bg-sky-950 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center">Visualiser <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                    )))}
                </div>
            </div>
        </div>
    )
}
export default PatientList;