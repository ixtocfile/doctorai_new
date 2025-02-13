import React from 'react';
import Popup from 'reactjs-popup';
import Sidebar from './Sidebar';

function DemandeAnalysee() {
    return (
        <div className="w-full h-screen flex sm:flex-row flex-col">
            <Sidebar/>
            <div className="container mx-auto py-10 h-64 md:w-4/5 w-11/12 px-6">
                <div className="w-full h-full">
                    <h3 className="font-bold text-xl mb-2">Demande</h3>
                    <div className="bg-white p-8 rounded shadow w-full ">
                        <form action="" method="POST">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="firstName" className="block text-sm font-medium text-gray-700">Prénom</label>
                                    <input type="text" id="firstName" name="firstName" placeholder="Jacqueline" className="mt-1 p-2 w-full border rounded-md"/>
                                </div>
                                <div>
                                    <label for="lastName" className="block text-sm font-medium text-gray-700">Nom</label>
                                    <input type="text" id="lastName" name="lastName" placeholder='Myrtille' className="mt-1 p-2 w-full border rounded-md"/>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label for="email" className="block text-sm font-medium text-gray-700">Adresse email</label>
                                    <input type="email" id="email" name="email" placeholder="jacqueline.myrtille@drh.com" className="mt-1 p-2 w-full border rounded-md"/>
                                </div>
                                <div>
                                    <label for="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
                                    <input type="number" id="phone" name="phone" placeholder="06 01 02 03 04 05" className="mt-1 p-2 w-full border rounded-md"/>
                                </div>
                            </div>

                            <div className="py-4 w-full">
                                <div className="shadow overflow-hidden rounded border-b border-gray-200">
                                    <table className="min-w-full bg-white">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Info A</th>
                                        <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Info B</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Info C</th>
                                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Info D</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                    <tr>
                                        <td className="w-1/3 text-left py-3 px-4">A définir</td>
                                        <td className="w-1/3 text-left py-3 px-4">A définir</td>
                                        <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="tel:622322662">A définir</a></td>
                                        <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="mailto:jonsmith@mail.com">A définir</a></td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="w-1/3 text-left py-3 px-4">A définir</td>
                                        <td className="w-1/3 text-left py-3 px-4">A définir</td>
                                        <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="tel:622322662">A définir</a></td>
                                        <td className="text-left py-3 px-4"><a className="hover:text-blue-500" href="mailto:jonsmith@mail.com">A définir</a></td>
                                    </tr>
                                    </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg border border-gray-200 text-gray-900 text-sm font-medium">
                                    <a href="#" aria-current="true" className="block px-4 py-2 border-b border-gray-200 w-full rounded-t-lg bg-sky-950 text-white cursor-pointer">
                                        Documents Joints
                                    </a>
                                    <a href="#" className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer">
                                        Titre_sejour_mme_myrtille.jpg
                                    </a>
                                    <a href="#" className="block px-4 py-2 border-b border-gray-200 w-full hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer">
                                        Diplome_mme_myrtille.jpg
                                    </a>
                                    <a href="#" className="block px-4 py-2 rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 cursor-pointer">
                                        CV_mme_myrtille.jpg
                                    </a>
                                </div>

                                <div className="">
                                    <textarea
                                    id="comment"
                                    name="comment"
                                    className="w-full px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-none border-gray-300 focus:outline-none border-solid focus:border-dashed resize-none"
                                    placeholder="Ci-joint dossier de Mme Myrtille. Cordialement"
                                    rows="5"
                                    //required
                                    ></textarea>
                                </div>
                            </div>
                        </form>
                        <h3 className="font-bold text-xl mt-4">Retour d'analyse</h3>
                        <div className="mt-4">
                            <p>Taux d'employabilité : 75%</p>
                        </div>
                        <div className="mt-4">
                            <p className="font-bold">Procédure :</p>
                            <ul>
                                <li>Lorem ipsum</li>
                                <li>Lorem ipsum</li>
                            </ul>
                        </div>
                        <div className="mt-4">
                            <p className="font-bold">Documents à fournir :</p>
                            <ul>
                                <li>Rib</li>
                                <li>Dernier diplôme</li>
                            </ul>
                        </div>
                        <div className="mt-4">
                            <p className="font-bold">Commentaires :</p>
                            <p>Demande approuvée - nous faire parvenir les documents demandés dans les 30 prochains jours.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DemandeAnalysee;