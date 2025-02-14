import * as React from 'react';
import Sidebar from './Sidebar';
import Datepicker from "react-tailwindcss-datepicker";
import axios from 'axios';

function Diagnostic() {


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
    
return (  
    <div className="w-full h-screen flex sm:flex-row flex-col">
    <Sidebar/>
        <p className="text-base font-semibold text-sky-950">200</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page trouvées !</h2>
        <p className="mt-6 text-base leading-7 text-gray-600">La page est une page de test</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link to='/' className="rounded-md bg-sky-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Se connecter</Link>
        <Link to='/' className="text-sm font-semibold text-gray-900">Contactez nous <span aria-hidden="true">&rarr;</span></Link>
        </div>
    </div>
);
}
export default Diagnostic;