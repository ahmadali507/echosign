import axios from "axios";
import Cookie from "js-cookie";
import { User } from "../../interfaces";
import { SERVER_URL } from "@/constants";

const API = axios.create({ baseURL: SERVER_URL });
API.interceptors.request.use((req) => {
    const stringifiedUser = Cookie.get("code.connect");
    if (stringifiedUser) {
        const token = JSON.parse(stringifiedUser);
        if (req.headers) {
            req.headers.authtoken = token;
        }
    }
    return req;
});

// auth
export const register = (userData: User) => API.post(`/auth/register`, userData);
export const verifyRegisterationEmail = ({ email, otp, }: { email: string; otp: string; }) => API.post(`/auth/verify_register_otp`, { email, otp });
export const login = (userData: { username: string; password: string }) => API.put(`/auth/login`, userData);
export const sendOTP = (email: string) => API.put(`/auth/send_otp`, { email });
export const verifyOTP = ({ email, otp }: { email: string; otp: string }) => API.put(`/auth/verify_otp`, { email, otp });
export const setNewPassword = ({ email, password, }: { email: string; password: string; }) => API.put(`/auth/newpassword`, { email, password });
export const changePassword = (userData: { oldPassword: string, newPassword: string }) => API.put(`/auth/change_password`, userData);
// users
export const getUsers = () => API.get(`/user/get/all`);
export const getUser = (userId: string) => API.get(`/user/get/single/${userId}`);
export const getProfile = () => API.get(`/user/get/profile`);
export const updateProfile = (profileData: User) => API.put(`/user/update/profile`, profileData);
export const editPersonalDetails = (type: "interests" | "hobbies" | "books" | "programming", values: string[]) => API.put(`/user/update/personal-details?type=${type}`, { values });
export const deleteUser = (userId: string) => API.delete(`/user/delete/${userId}`);