import { Route, Routes } from "react-router-dom";
import "./index.css";
import { ChangePassword, ForgetPassword, Home, Login, Register, ResetPassword, TermsAndConditions } from "./pages";
import DefaultLayout from "./wrappers/DefaultLayout";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Home />} />
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