import axios from "axios";
import Cookie from "js-cookie";
import { ContactData, User } from "../../interfaces";
import { SERVER_URL } from "@/constants";

const API = axios.create({ baseURL: SERVER_URL });
API.interceptors.request.use((req) => {
    const stringifiedUser = Cookie.get("echo.token");
    if (stringifiedUser) {
        const token = JSON.parse(stringifiedUser);
        if (req.headers) {
            req.headers.authtoken = token;
        }
    }
    return req;
});


// GENERAL
export const uploadImage = (formData: FormData) => API.post(`/general/upload_image`, formData);
export const deleteImage = (filename: string) => API.delete(`/general/delete_image/${filename}`);

// auth
export const register = (userData: User) => API.post(`/auth/register`, userData);
export const login = (userData: { usernameOrEmail: string; password: string }) => API.put(`/auth/login`, userData);
export const subscribe = (email: string) => API.put(`/auth/subscribe`, { email });
export const contact = (formData: ContactData) => API.post(`/auth/contact`, formData);

// users
export const getUsers = () => API.get(`/user/all`);
export const getUser = (userId: string) => API.get(`/user/single/${userId}`);
export const updateUser = (userId: string, profileData: { firstName: string, lastName: string, bio: string }) => API.put(`/user/single/${userId}`, profileData);
export const getProfile = () => API.get(`/user/profile`);
export const updateProfile = (profileData: User) => API.put(`/user/profile`, profileData);
export const updatePassword = (passwordData: { oldPassword: string, newPassword: string }) => API.put(`/user/password`, passwordData);
export const editPersonalDetails = (type: "interests" | "hobbies" | "books" | "programming", values: string[]) => API.put(`/user/update/personal-details?type=${type}`, { values });
export const deleteUser = (userId: string) => API.delete(`/user/delete/${userId}`);

// friends

// friends
export const sendFriendRequest = (receiverId: string) => API.put(`/friend/request/send/${receiverId}`);
export const rejectFriendRequest = (receiverId: string) => API.put(`/friend/request/reject/${receiverId}`);
export const removeFriendRequest = (receiverId: string) => API.put(`/friend/request/remove/${receiverId}`);
export const acceptFriendRequest = (senderId: string) => API.put(`/friend/request/accept/${senderId}`);
export const getSuggestedUsers = (query: string) => API.get(`/friend/suggested-users${query}`);
export const getFriends = (query: string) => API.get(`/friend/all${query}`);
export const searchFriends = (query: string) => API.get(`/friend/search${query}`);
export const searchUsers = (query: string) => API.get(`/friend/search-user${query}`);
export const getSentRequests = (query: string) => API.get(`/friend/sent-requests${query}`);
export const getReceivedRequests = (query: string) => API.get(`/friend/received-requests${query}`);
