import React from 'react';
import Sidebar from './Sidebar';

function ProfilUtilisateur() {
    return (
        <div className="w-full h-screen flex sm:flex-row flex-col">
            <Sidebar/>
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <div className="w-full h-full">
                    <h3 className="font-bold text-xl mb-2">Profil Utilisateur</h3>
                    <div className="bg-white p-8 rounded shadow w-full ">
                        <form action="#" method="POST">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="societe" className="block text-sm font-medium text-gray-700">Société</label>
                                    <input type="text" id="societe" name="societe" placeholder="Client RH" className="mt-1 p-2 w-full border rounded-md"/>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label for="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                                    <input type="text" id="firstName" name="firstName" placeholder="Jane" className="mt-1 p-2 w-full border rounded-md"/>
                                </div>
                                <div>
                                    <label for="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                                    <input type="text" id="lastName" name="lastName" placeholder="Smith" className="mt-1 p-2 w-full border rounded-md"/>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label for="email" className="block text-sm font-medium text-gray-700">Adresse email</label>
                                    <input type="email" id="email" name="email" placeholder="jane.smith@clientrh.com" className="mt-1 p-2 w-full border rounded-md"/>
                                </div>
                                <div>
                                    <label for="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                                    <input type="password" id="password" name="password" placeholder="xyw123" className="mt-1 p-2 w-full border rounded-md"/>
                                </div>
                            </div>

                            <div className="mt-6">
                                <button type="submit" className=" p-3 bg-sky-950 text-white rounded-md hover:bg-blue-600">Enregister Changements</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProfilUtilisateur;