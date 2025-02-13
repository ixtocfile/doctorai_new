import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import { TrashIcon, LockOpenIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom'; 

function Demande() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [requestData, setRequestData] = useState(null); 
    const [userData, setUserData] = useState({
        user_function: '',
        user_firstname: '',
        user_lastname: '',
        user_email: '',
        user_phone: '',
        user_street: '',
        user_zipcode: '',
        user_city: '',
        user_country: ''
    }); 
    const [missionData, setMissionData] = useState({
        mission_company: '', 
        mission_street: '', 
        mission_zipcode: '', 
        mission_city: '', 
        mission_country: '', 
        mission_description: '', 
        mission_startDate:'', 
        mission_endDate: '', 
        mission_contact_role: '', 
        mission_contact_firstname:'',
        mission_contact_lastname:'',
        mission_contact_email: '', 
        mission_country: '',
        mission_contact_phone: ''
    }); 
    const [error, setError] = useState(''); 
    const [isUserEditable, setIsUserEditable] = useState(false);
    const [isMissionEditable, setIsMissionEditable] = useState(false);
    
  //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU1MjQ0Mzl9.c00hprgt70vW5x6aK8Co2x7lED6Mg1-I28LfBWodlD4'; //user 4 client
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU1MjQ2NTR9.p9YHsCuCDEMwFJAyltDdL8-6zHOMhOSHjnEVmyPwvdQ' //user 7 admin
    
    const toggleEditUser = async () => {
        if (isUserEditable) {
            console.log("Before saving userData:", userData); 
            console.log("Toggle Edit User");
            // Save user data when clicking the lock icon to disable editing
            try {
                await saveUserData();
                setIsUserEditable(false); 
            } catch (error) {
                console.error('Error saving user data:', error);
                setError('Error saving user data');
            }
        } else {
            setIsUserEditable(true);
        }
    };

    const toggleEditMission = async () => {
        if (isMissionEditable) {
            console.log("Before saving missionData:", missionData); 
            console.log("Toggle Mission User");
            // Save mission data when clicking the lock icon to disable editing
            try {
                await saveMissionData();
                setIsMissionEditable(false); 
            } catch (error) {
                console.error('Error saving mission data:', error);
                setError('Error saving mission data');
            }
        } else {
            setIsMissionEditable(true);
        }
    };
    

    //Get data from Request Table
    const getRequestData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/requests/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json', 
                },
            });
            setRequestData(response.data); 
            console.log('Success Request Data:', response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching request data:", error);
            setError('Error fetching request data');
        }
    };

    //Get data from User Table
    const getUserData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    'Content-Type': 'application/json', 
                }
            });
            setUserData(response.data); 
            console.log('Success User Data:', response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError('Error fetching user data'); 
        }
    };

    //Get data from Mission Table
    const getMissionData = async (missionId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/missions/${missionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json', 
                }
            });
            setMissionData(response.data); 
            console.log('Success Mission Data:', response.data);
        } catch (error) {
            console.error("Error fetching mission data:", error);
            setError('Error fetching mission data'); 
        }
    };

    const deleteRequest = async () => {
        // Show confirmation popup
        const confirmation = window.confirm(
          'Are you sure you want to delete this request?'
        );
    
        if (confirmation) {
          try {
            await axios.delete(`http://localhost:3000/api/v1/requests/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`, // Assume token is defined
                'Content-Type': 'application/json',
              },
            });
            console.log('Request deleted successfully.');
    
           // Redirect to dashboard route after successful deletion
            navigate('/dashboard');

            console.log('Redirected to dashboard.');
          } catch (error) {
            console.error('Error deleting request:', error);
            setError('Error deleting request');
          }
        }
    };

    const handleDelete = async () => {
        await deleteRequest(id, token);
    };
 
     // Save the edited user data
    const saveUserData = async () => {
        const updatedUserData = {
            user_function: userData.user_function || undefined,
            user_firstname: userData.user_firstname || undefined,
            user_lastname: userData.user_lastname || undefined,
            user_email: userData.user_email || undefined,
            user_phone: userData.user_phone ? String(userData.user_phone) : undefined, 
            user_street: userData.user_street || undefined,
            user_zipcode: userData.user_zipcode ? String(userData.user_zipcode) : undefined,  
            user_city: userData.user_city || undefined,
            user_country: userData.user_country || undefined,
        };
      
        try {
          const response = await axios.patch(
            `http://localhost:3000/api/v1/users/${userData.user_id}`,
            updatedUserData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('Success:', response.data);
        } catch (error) {
          console.error('Error saving user data:', error);
        }
    };
      
    // Save the edited mission data
    const saveMissionData = async () => {
        const updatedMissionData = {
            mission_company: missionData.mission_company || undefined, 
            mission_street: missionData.mission_street || undefined , 
            mission_zipcode: missionData.mission_zipcode || undefined, 
            mission_city: missionData.mission_city || undefined, 
            mission_country: missionData.mission_country || undefined, 
            mission_description: missionData.mission_description || undefined, 
            mission_startDate: missionData.mission_startDate || undefined, 
            mission_endDate: missionData.mission_endDate || undefined, 
            mission_contact_role: missionData.mission_contact_role || undefined, 
            mission_contact_firstname: missionData.mission_contact_firstname || undefined,
            mission_contact_lastname: missionData.mission_contact_lastname || undefined,
            mission_contact_email: missionData.mission_contact_email || undefined, 
            mission_country: missionData.mission_country || undefined,
            mission_contact_phone: missionData.mission_contact_phone ? String(missionData.mission_contact_phone ) : undefined
        };
      
        try {
          const response = await axios.patch(
            `http://localhost:3000/api/v1/missions/${missionData.mission_id}`,
            updatedMissionData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          console.log('Success:', response.data);
        } catch (error) {
          console.error('Error saving user data:', error);
        }
    };
      

    useEffect(() => {
        const fetchData = async () => {
            const requestData = await getRequestData(); 
            if (requestData) {
                await getUserData(requestData.user_id); 
                if (requestData.mission_id) {
                    await getMissionData(requestData.mission_id); 
                }
            }
        };

        fetchData();
    }, []); 

    return (
        <div className="w-full h-screen flex sm:flex-row flex-col">
            <Sidebar/>
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <div className="w-full h-128 overflow-auto">
                    <div className='flex flex-row py-4'>
                        <h3 className="font-bold text-xl mr-4">Demande #{requestData ? requestData.id : ''}</h3>
                        <button type="button" onClick={handleDelete}>
                            <TrashIcon className="size-6 text-gray-400" />
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded shadow w-full">
    
                        <form>
                            <div className='flex flex-row pt-2'>
                                <h2 className="font-bold text-l mr-6">Informations sur le Sous-traitant</h2>
                                <button type="button" onClick={toggleEditUser}>
                                    {isUserEditable ? (
                                        <LockOpenIcon className="size-6 text-sky-300" />
                                    ) : (
                                       <PencilSquareIcon className="size-6 text-zinc-400" />
                                    )}
                                </button>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label for="user_function" className="block text-sm font-medium text-gray-700">Poste</label>
                                    <input 
                                        type="text" 
                                        id="user_function" 
                                        name="user_function" 
                                        value={userData ? userData.user_function : ''} 
                                        onChange={(e) => setUserData({ ...userData, user_function: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isUserEditable}
                                    />
                                </div>
                                <div>
                                    <label for="user_firstname" className="block text-sm font-medium text-gray-700">Prénom</label>
                                    <input 
                                        type="text" 
                                        id="user_firstname" 
                                        name="user_firstname" 
                                        value={userData ? userData.user_firstname : ''}
                                        onChange={(e) => setUserData({ ...userData, user_firstname: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isUserEditable}
                                    />
                                </div>
                                <div>
                                    <label for="user_lastname" className="block text-sm font-medium text-gray-700">Nom</label>
                                    <input 
                                        type="text" 
                                        id="user_lastname" 
                                        name="user_lastname" 
                                        value={userData ? userData.user_lastname : ''}
                                        onChange={(e) => setUserData({ ...userData, user_lastname: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isUserEditable}
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
                                        value={userData ? userData.user_email : ''}
                                        onChange={(e) => setUserData({ ...userData, user_email: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isUserEditable}
                                    />
                                </div>
                                <div>
                                    <label for="user_phone" className="block text-sm font-medium text-gray-700">Téléphone </label>
                                    <input 
                                        type="text" 
                                        id="user_phone" 
                                        name="user_phone" 
                                        value={userData?.user_phone || ''}  
                                        onChange={(e) => setUserData({ ...userData, user_phone: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isUserEditable}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label for="user_street" className="block text-sm font-medium text-gray-700">Adresse </label>
                                    <input 
                                        type="text" 
                                        id="user_street" 
                                        name="user_street"
                                        value={userData ? userData.user_street : ''}
                                        onChange={(e) => setUserData({ ...userData, user_street: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isUserEditable}
                                    />
                                </div>
                                <div>
                                    <label for="user_zipcode" className="block text-sm font-medium text-gray-700">Code Postal </label>
                                    <input 
                                        type="number" 
                                        id="user_zipcode" 
                                        name="user_zipcode" 
                                        value={userData ? userData.user_zipcode : ''}
                                        onChange={(e) => setUserData({ ...userData, user_zipcode: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isUserEditable}
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
                                        value={userData ? userData.user_city : ''}
                                        onChange={(e) => setUserData({ ...userData, user_city: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isUserEditable}
                                    />
                                </div>
                                <div>
                                    <label for="user_country" className="block text-sm font-medium text-gray-700">Pays</label>
                                    <input 
                                        type="text" 
                                        id="user_country" 
                                        name="user_country" 
                                        value={userData ? userData.user_country : ''}
                                        onChange={(e) => setUserData({ ...userData, user_country: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isUserEditable}
                                    />
                                </div>
                            </div>

                            <div className='flex flex-row pt-8'>
                                <h2 className="font-bold text-l mr-8">Informations sur la mission</h2>
                                <button type="button" onClick={toggleEditMission}>
                                    {isMissionEditable ? (
                                        <LockOpenIcon className="size-6 text-sky-300" />
                                    ) : (
                                        <PencilSquareIcon className="size-6 text-zinc-400" />
                                    )}
                                </button>
                            </div>
                            <h2 className="font-medium text-m pt-2">Lieu de la mission</h2>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label for="mission_company" className="block text-sm font-medium text-gray-700">Nom de la mission / Entreprise</label>
                                    <input 
                                        type="text" 
                                        id="mission_company" 
                                        name="mission_company" 
                                        value={missionData ? missionData.mission_company : ''}
                                        onChange={(e) => setMissionData({ ...missionData, mission_company: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isMissionEditable}
                                    />
                                </div>
                                <div>
                                    <label for="mission_street" className="block text-sm font-medium text-gray-700">Adresse</label>
                                    <input 
                                        type="text" 
                                        id="mission_street" 
                                        name="mission_street" 
                                        value={missionData ? missionData.mission_street : ''}
                                        onChange={(e) => setMissionData({ ...missionData, mission_street: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isMissionEditable}
                                    />
                                </div>
                                <div>
                                    <label for="mission_zipcode" className="block text-sm font-medium text-gray-700">Code Postal</label>
                                    <input 
                                        type="text" 
                                        id="mission_zipcode" 
                                        name="mission_zipcode" 
                                        value={missionData ? missionData.mission_zipcode : ''}
                                        onChange={(e) => setMissionData({ ...missionData, mission_zipcode: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isMissionEditable}
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
                                        value={missionData ? missionData.mission_city : ''}
                                        onChange={(e) => setMissionData({ ...missionData, mission_city: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isMissionEditable}
                                    />
                                </div>
                                <div>
                                    <label for="mission_country" className="block text-sm font-medium text-gray-700">Pays</label>
                                    <input 
                                        type="text" 
                                        id="mission_country" 
                                        name="mission_country" 
                                        value={missionData ? missionData.mission_country : ''}
                                        onChange={(e) => setMissionData({ ...missionData, mission_country: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isMissionEditable}
                                    />
                                </div>
                            </div>

                            <h2 className="font-medium text-m pt-2">Détails de la mission</h2>

                            <div>
                                <label for="mission_description" className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea 
                                    id='mission_description' 
                                    rows="3" 
                                    name="mission_description"
                                    value={missionData ? missionData.mission_description: ''}
                                    onChange={(e) => setMissionData({ ...missionData, mission_description: e.target.value })}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    disabled={!isMissionEditable}
                                />
                            </div>

                            <div className="mt-4 grid grid-cols-4 gap-4">
                                <div>
                                    <label for="dates" className="block text-sm font-medium text-gray-700">Dates de la mission </label>
                                    {/* <Datepicker value={value}  />  */}
                                </div>
                                <div>
                                    <label for="mission_contact_role" className="block text-sm font-medium text-gray-700">Poste du Contact Mission</label>
                                    <input 
                                        type="text" 
                                        id="mission_contact_role" 
                                        name="mission_contact_role" 
                                        value={missionData ? missionData.mission_contact_role : ''}
                                        onChange={(e) => setMissionData({ ...missionData, mission_contact_role: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isMissionEditable}
                                    />
                                </div>
                                <div>
                                    <label for="mission_contact_firstname" className="block text-sm font-medium text-gray-700">Contact Prénom</label>
                                    <input 
                                        type="text" 
                                        id="mission_contact_firstname" 
                                        name="mission_contact_firstname" 
                                        value={missionData ? missionData.mission_contact_firstname : ''}
                                        onChange={(e) => setMissionData({ ...missionData, mission_contact_firstname: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isMissionEditable}
                                    />
                                </div>
                                <div>
                                    <label for="mission_contact_lastname" className="block text-sm font-medium text-gray-700">Nom</label>
                                    <input 
                                        type="text" 
                                        id="mission_contact_lastname" 
                                        name="mission_contact_lastname"
                                        value={missionData ? missionData.mission_contact_lastname : ''}
                                        onChange={(e) => setMissionData({ ...missionData, mission_contact_lastname: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isMissionEditable}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label for="mission_contact_email" className="block text-sm font-medium text-gray-700">Adresse email</label>
                                    <input 
                                        type="email" 
                                        id="mission_contact_email" 
                                        name="mission_contact_email"
                                        value={missionData ? missionData.mission_contact_email : ''}
                                        onChange={(e) => setMissionData({ ...missionData, mission_contact_email: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isMissionEditable}
                                    />
                                </div>
                                <div>
                                    <label for="mission_contact_phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                                    <input 
                                        type="text" 
                                        id="mission_contact_phone" 
                                        name="mission_contact_phone" 
                                        value={missionData?.mission_contact_phone|| ''}  
                                        onChange={(e) => setMissionData({ ...missionData, mission_contact_phone: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded-md"
                                        disabled={!isMissionEditable}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Demande;