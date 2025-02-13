import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);  // State to toggle sidebar

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Hamburger Icon for mobile */}
            <div className="sm:hidden flex justify-between items-center p-4 bg-gray-100">
                <span className='text-sky-950 uppercase text-2xl'>Menu</span>
                <button onClick={toggleSidebar} className="text-sky-950 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 sm:relative sm:w-64 w-full h-full sm:h-auto bg-gray-100 shadow transform ${isOpen ? "translate-y-0" : "-translate-y-full"} sm:translate-y-0 transition-transform duration-300 ease-in-out`}>
                {/* Close button for mobile */}
                <div className="sm:hidden flex justify-between items-center p-4 bg-gray-100">
                    <span className='text-sky-950 uppercase text-2xl'>Menu</span>
                    <button onClick={toggleSidebar} className="text-sky-950 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-8">
                    <div className="h-16 w-full flex mb-6 pl-2">
                        <span className='text-sky-950 uppercase text-2xl mt-6'>Menu</span>
                    </div>
                    <hr className='border-b-1 border-gray-200'/>
                    <ul className="mt-6">
                        <li className="flex w-full justify-between p-2 rounded-full text-sky-950 hover:text-gray-300 hover:bg-sky-950 active:bg-sky-950 focus:outline-none focus:ring focus:ring-bg-sky-950 cursor-pointer items-center mb-6">
                            <Link to="/dashboardv1" className="flex items-center" onClick={() => setIsOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                    <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                                    <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                                    <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                                    <rect x="14" y="14" width="6" height="6" rx="1"></rect>
                                </svg>
                                <span className="text-sm ml-2">All Patients</span>
                            </Link>
                        </li>
                        <li className="flex w-full justify-between p-2 rounded-full text-sky-950 hover:text-gray-300 hover:bg-sky-950 active:bg-sky-950 focus:outline-none focus:ring focus:ring-bg-sky-950 cursor-pointer items-center mb-6">
                            <Link to="/dashboard" className="flex items-center" onClick={() => setIsOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                    <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                                    <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                                    <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                                    <rect x="14" y="14" width="6" height="6" rx="1"></rect>
                                </svg>
                                <span className="text-sm ml-2">Dossier Reference</span>
                            </Link>
                        </li>
                        <li className="flex w-full justify-between p-2 rounded-full text-sky-950 hover:text-gray-300 hover:bg-sky-950 active:bg-sky-950 focus:outline-none focus:ring focus:ring-bg-sky-950 cursor-pointer items-center mb-6">
                            <Link to="/creation-demande" className="flex items-center" onClick={() => setIsOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-compass" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                    <polyline points="8 16 10 10 16 8 14 14 8 16"></polyline>
                                    <circle cx="12" cy="12" r="9"></circle>
                                </svg>
                                <span className="text-sm ml-2">Nouvelle Patient (<i>in progress</i>)</span>
                            </Link>
                        </li>
                        <li className="flex w-full justify-between p-2 rounded-full text-sky-950 hover:text-gray-300 hover:bg-sky-950 active:bg-sky-950 focus:outline-none focus:ring focus:ring-bg-sky-950 cursor-pointer items-center mb-6">
                            <Link to="/creation-compte" className="flex items-center" onClick={() => setIsOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                    <polyline points="7 8 3 12 7 16"></polyline>
                                    <polyline points="17 8 21 12 17 16"></polyline>
                                    <line x1="14" y1="4" x2="10" y2="20"></line>
                                </svg>
                                <span className="text-sm ml-2">Création Compte</span>
                            </Link>
                        </li>
                        <li className="flex w-full justify-between p-2 rounded-full text-sky-950 hover:text-gray-300 hover:bg-sky-950 active:bg-sky-950 focus:outline-none focus:ring focus:ring-bg-sky-950 cursor-pointer items-center mb-6">
                            <Link to="/News" className="flex items-center" onClick={() => setIsOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                    <polyline points="7 8 3 12 7 16"></polyline>
                                    <polyline points="17 8 21 12 17 16"></polyline>
                                    <line x1="14" y1="4" x2="10" y2="20"></line>
                                </svg>
                                <span className="text-sm ml-2">News</span>
                            </Link>
                        </li>
                        <li className="flex w-full justify-between p-2 rounded-full text-sky-950 hover:text-gray-300 hover:bg-sky-950 active:bg-sky-950 focus:outline-none focus:ring focus:ring-bg-sky-950 cursor-pointer items-center mb-6">
                            <Link to="/profil" className="flex items-center" onClick={() => setIsOpen(false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.544-.94 3.311.827 2.37 2.37a1.724 1.724 0 0 0 1.066 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.065 -2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 0 0 2.572 -1.065z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                <span className="text-sm ml-2">Mon profil</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="mt-80">
                    <div className="w-full flex flex-col text-center mb-6">
                        <div className="flex justify-center items-center">
                            <img className="w-10 h-10 rounded-full" src="https://picsum.photos/seed/picsum/200/300" alt="User"></img>
                        </div>
                        <p className="text-sm font-bold">John Doe</p>
                        <p className='text-sm font-thin text-sky-950'>john.doe@mobilitae.com</p>
                    </div>
                    <div className="px-8 border-t border-gray-200">
                        <ul className="w-full">
                            <li className="cursor-pointer py-5 pl-2 text-sky-950">
                                <Link to="/" className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <span className="text-sky-950 text-sm ml-2">Se déconnecter</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
