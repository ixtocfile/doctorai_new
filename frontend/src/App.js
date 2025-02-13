import React from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import Home from "./pages/dashboard/Home";
import PatientList from "./pages/patient/PatientList";
import Patient from "./pages/patient/Patient";
import Demande from "./pages/dashboard/Demande";
import CreationCompte from "./pages/dashboard/CreationCompte";
import CreationDemande from "./pages/dashboard/CreationDemande";
import ProfilUtilisateur from "./pages/dashboard/ProfilUtilisateur";
import DemandeAnalysee from "./pages/dashboard/DemandeAnalysee";
import DossiersTermines from "./pages/dashboard/DossiersTermines";

function App() {
  return (
      <Routes>
        <Route path="/" element={ <Login/> }/>
        <Route path="/reset" element={ <Reset/> }/>
        <Route path="/dashboard" element={ <Home/> }/>
        <Route path="/dashboardv1" element={ <PatientList/> }/>
        <Route path="/creation-compte" element={ <CreationCompte/> }/>
        <Route path="/creation-demande" element={ <CreationDemande/> }/>
        <Route path="/demandes" element={ <DossiersTermines/> }/>
        <Route path="/demande/:id" element={ <Demande/> }/>
        <Route path="/patient/:id" element={ <Patient/> }/>
        <Route path="/demande-analysee" element={ <DemandeAnalysee/> }/>
        <Route path="/profil" element={ <ProfilUtilisateur/> }/>
        <Route path="*"element={<NotFound />}/>
      </Routes>
  )
}

export default App;
