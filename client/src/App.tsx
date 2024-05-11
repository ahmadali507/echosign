import { Route, Routes } from "react-router-dom";
import "./index.css";
import { ChangePassword, ForgetPassword, LandingPage, Login, Register, ResetPassword, TermsAndConditions, Contact, Dashboard } from "./pages";
import DefaultLayout from "./wrappers/DefaultLayout";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contactus" element={<Contact />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;