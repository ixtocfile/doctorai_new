import React from 'react';
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
            <p className="text-base font-semibold text-sky-950">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page non trouvée</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">Désolée, la page recherchée n'existe pas.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to='/' className="rounded-md bg-sky-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Se connecter</Link>
            <Link to='/' className="text-sm font-semibold text-gray-900">Contactez nous <span aria-hidden="true">&rarr;</span></Link>
            </div>
        </div>
    )
}