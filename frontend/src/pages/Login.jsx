import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const navigate = useNavigate();

    const logUser = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/auth/login`, {
               user_email: email,
               user_password: password
            });
    
            console.log("user loggin in:", response.data)
            
            const { token, user } = response.data;
    
            // Save the token (use localStorage or cookies for persistent storage)
            localStorage.setItem('token', token);
            console.log('User logged in successfully:', user); 
    
            navigate('/dashboard');
        } catch (error) {
            console.error("Error logging in:", error.response || error.message);
            setError('Invalid login credentials');
        }
    };    

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevent page reload
        console.log("front Email:", email, "front Password:", password); // Log state
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
                            Login
                        </label>

                        <form  onSubmit={handleSubmit} className="mt-10">             
                            <div>
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    onChange={e => setEmail(e.target.value)}
                                    className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>
                            </div>
                
                            <div className="mt-7">                
                                <input 
                                    type="password" 
                                    placeholder="Mot de passe" 
                                    onChange={e => setPassword(e.target.value)}
                                    className="mt-1 pl-2 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"/>                           
                            </div>

                            <div className="mt-7 flex">
                                <label htmlFor="remember_me" className="inline-flex items-center w-full cursor-pointer">
                                    <input id="remember_me" type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember"/>
                                    <span className="ml-2 text-sm text-gray-600">
                                        Sauvegarder mes identifiants
                                    </span>
                                </label>
                            </div>
                
                            <div className="mt-7 flex flex-col">
                                <button type="submit" onClick={handleSubmit} className="p-36 bg-sky-950 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Login
                                </button>
                            </div>
                
                             <div className="mt-7">
                                <div className="flex justify-center items-center">
                                    {/* <label className="mr-2" >Mot de passe oublié ?</label> */}
                                    <Link to='/reset' className="text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        Mot de passe oublié ?
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  
  export default Login;