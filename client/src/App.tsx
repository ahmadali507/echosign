import { Route, Routes } from "react-router-dom";
import "./index.css";
import {ChangePassword,ForgetPassword,Home,Login,Register,ResetPassword,TermsAndConditions, Contact} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/contactus" element={<Contact />} />
    </Routes>
  );
}

export default App;