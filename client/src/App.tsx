/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from "react-router-dom";
import "./index.css";
import { ChangePassword, ForgetPassword, LandingPage, Login, Register, ResetPassword, TermsAndConditions, Contact, Dashboard } from "./pages";
import DefaultLayout from "./wrappers/DefaultLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { getProfile } from "./store/reducers/authSlice";
import Authenticated from "./wrappers/Authenticated";
import NotFound from "./components/NotFound";

function App() {

  // TODO: check working of toast
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!user) dispatch<any>(getProfile())
  }, [user, dispatch])

  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Authenticated><Dashboard /></Authenticated>} />
        <Route path="/contactus" element={<Contact />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;