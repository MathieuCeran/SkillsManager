import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";
import Profil from "../../Pages/Profil";
import Trending from "../../Pages/Trending";
import Signup from "../../Pages/Signup";
import UserProfil from "../../Pages/UserProfil";
import Formation from "../../Pages/Formation";
import AdminUsers from "../../Pages/AdminUsers";
import FormationAssign from "../../Pages/FormationAssign";
import AdminFormatonRequest from "../../Pages/AdminFormatonRequest";
import AdminFormationRequestPlanifie from "../../Pages/AdminFormationRequestPlanifie";
import AdminFormationRequestTermine from "../../Pages/AdminFormationRequestTermine";
import AdminFormationRequestAnnule from "../../Pages/AdminFormationRequestAnnule";
import AllUserFormation from "../../Pages/AllUserFormation";
import ForgotPassword from "../../Pages/ForgotPassword";
import NewPassword from "../../Pages/NewPassword";


const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<NewPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/userprofil/:id" element={<UserProfil />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/formation" element={<Formation />} />
        <Route path="/adminUsers" element={<AdminUsers />} />
        <Route path="/formationAssign/:id" element={<FormationAssign />} />
        <Route path="/requestFormation" element={<AdminFormatonRequest />} />
        <Route path="/planifie" element={<AdminFormationRequestPlanifie />} />
        <Route path="/termine" element={<AdminFormationRequestTermine />} />
        <Route path="/annule" element={<AdminFormationRequestAnnule />} />
        <Route path="/alluserformation" element={<AllUserFormation />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
