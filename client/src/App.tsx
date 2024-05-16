/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from "react-router-dom";
import "./index.css";
import { ForgetPassword, LandingPage, Login, Register, TermsAndConditions, Contact, Dashboard, Profile, About, Users, TextToVoice, PrivacyPolicy } from "./pages";
import DefaultLayout from "./wrappers/DefaultLayout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { getProfile } from "./store/reducers/userSlice";
import Authenticated from "./wrappers/Authenticated";
import NotFound from "./components/NotFound";
import Chat from "./pages/Chat";

function App() {

  const dispatch = useDispatch()
  const { loggedUser } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (!loggedUser) dispatch<any>(getProfile())
  }, [loggedUser, dispatch])

  return (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Authenticated><Dashboard /></Authenticated>} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Authenticated><Profile /></Authenticated>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/users" element={<Authenticated><Users /></Authenticated>} />
        <Route path="/chat" element={<Authenticated><Chat /></Authenticated>} />
        <Route path="/user/:userId" element={<Profile />} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        <Route path="/TextToVoice" element={<TextToVoice />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;