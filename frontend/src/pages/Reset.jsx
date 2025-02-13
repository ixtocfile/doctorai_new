import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

function Reset() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    //const history = useHistory();

    const logUser = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/sendRecovery`, {
                email,
            });
    
            const { token, user } = response.data;
    
            // Save the token (use localStorage or cookies for persistent storage)
            localStorage.setItem('token', token);

        } catch (error) {
            console.error("Error logging in:", error);
            setError('Invalid login credentials');
        }
    };    

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent page reload
        await logUser();  // Call the logUser function
    };
    

    return (
        <div className="font-sans">
            <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
                <div className="relative sm:max-w-sm w-full">
                    <div className="card bg-sky-950 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div className="card bg-blue-200 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div className="relative w-full rounded-3xl  px-6 py-4 bg-white shadow-md">
                        <label htmlFor="" className="block mt-3 text-sm text-gray-700 text-center font-semibold">
                            Réinitialiser le mot de passe
                        </label>

                        <form  onSubmit={handleSubmit} className="mt-10">             
                            <div>
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    onChange={e => setEmail(e.target.value)}
                                    className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                
                            <div className="mt-7 flex flex-col">
                                <button type="submit" onClick={handleSubmit} className="p-36 bg-sky-950 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Envoyez
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  
  export default Reset;