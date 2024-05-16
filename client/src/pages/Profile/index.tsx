/* eslint-disable @typescript-eslint/no-explicit-any */
import { updatePassword, updateProfile, uploadImage } from "@/store/reducers/userSlice";
import { Eye, EyeOff, MessageCircle, Upload } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "@/utils/Loader";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "@/store/reducers/userSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SuggestedFriends from "./SuggestedUsers";
import FriendButton from "@/utils/FriendButton";
import { User } from "@/interfaces";

const Profile = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userId } = useParams()
    const imageRef = useRef(null)
    const { currentUser, loggedUser } = useSelector((state: RootState) => state.user)
    const initialData = { oldPassword: "", newPassword: "", bio: loggedUser?.bio || "", firstName: loggedUser?.firstName || "", lastName: loggedUser?.lastName || "" }

    ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
    const [formData, setFormData] = useState(initialData);
    const [showPassword, setShowPassword] = useState({ oldPassword: false, newPassword: false })
    const [loading, setLoading] = useState({ profile: false, password: false })
    const [imageUploading, setImageUploading] = useState(false)
    const [image, setImage] = useState(loggedUser?.photoUrl)

    ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////
    useEffect(() => {
        setFormData(pre => ({ ...pre, firstName: loggedUser?.firstName || "", lastName: loggedUser?.lastName || "", bio: loggedUser?.bio || "" }))
    }, [loggedUser])
    useEffect(() => {
        if (userId) {
            dispatch<any>(getUser(userId))
        }
    }, [userId])
    useEffect(() => {
        if (userId)
            setImage(currentUser?.photoUrl)
        else
            setImage(loggedUser?.photoUrl)
    }, [loggedUser, currentUser])
    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const onUpdatePassword = () => {

        if (!formData?.oldPassword) return toast.error('Old Password is required.')
        if (!formData?.newPassword) return toast.error('New Password is required.')

        setLoading(pre => ({ ...pre, password: true }))
        dispatch<any>(updatePassword(formData))
            .then(() => {
                setFormData(initialData)
            })
            .catch((err: any) => {
                console.error(err)
            })
            .finally(() => {
                setLoading(pre => ({ ...pre, password: false }))
            })

    }
    const onUpdateProfile = () => {

        if (!formData?.firstName) return toast.error('First name is required.')
        if (!formData?.lastName) return toast.error('Last name is required.')

        setLoading(pre => ({ ...pre, profile: true }))
        dispatch<any>(updateProfile({ userId: loggedUser?._id as string, data: { firstName: formData.firstName as string, lastName: formData.lastName as string, bio: formData.bio as string } }))
            .then(() => {
                setFormData(initialData)
            })
            .catch((err: any) => {
                console.error(err)
            })
            .finally(() => {
                setLoading(pre => ({ ...pre, profile: false }))
            })
    }

    const toggleShowPassword = (name: 'oldPassword' | 'newPassword') => {
        setShowPassword(pre => ({ ...pre, [name]: !pre[name] }))
    }

    const handleUploadImage = (e: any) => {
        const image = e.target.files[0]
        const formData = new FormData();
        formData.append('image', image);
        setImageUploading(true)
        dispatch<any>(uploadImage(formData)).finally(() => {
            setImageUploading(false)
        })
    };

    const handleClick = () => {
        if (imageRef.current)
            imageRef.current?.click()
    }


    ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////
    return (
        <div className="flex justify-center items-center">

            <div style={{ minHeight: 'calc(80vh - 5rem)' }} className="col-span-1 flex justify-end items-center h-fit mb-14 mt-6 w-full">
                <div className="container mt-16 mb-8 w-full lg:px-48 md:px-30 ">
                    <div id="signin-form" className="flex flex-col gap-2 w-full" >

                        <div className="flex justify-center items-center">
                            {
                                <div className='w-40 h-40 flex justify-center rounded-full relative' >
                                    {
                                        imageUploading
                                            ?
                                            <div className="w-full h-full bg-white shadow-md rounded-full relative flex justify-center items-center ">
                                                <Loader size="xl" />
                                            </div>
                                            :
                                            <Avatar className='w-full h-full text-8xl capitalize' >
                                                <AvatarImage src={image} className='object-cover' />
                                                <AvatarFallback>{(userId ? currentUser : loggedUser)?.username?.[0]}</AvatarFallback>
                                            </Avatar>
                                    }
                                    {
                                        !userId &&
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button size='icon' variant='outline' onClick={handleClick} className="rounded-full absolute top-0 right-0 flex justify-center items-center   " >
                                                    <Upload className="w-4 h-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Upload Picture</TooltipContent>
                                        </Tooltip>
                                    }
                                </div>
                            }
                            <input
                                ref={imageRef}
                                type="file"
                                accept="image/*"
                                className='hidden'
                                placeholder="Upload Image"
                                onChange={handleUploadImage}
                            />
                        </div>

                        {
                            userId
                                ?
                                <div className="w-full flex flex-col justify-center items-center">
                                    <h3 className="font-semibold text-2xl flex items-center " >
                                        {currentUser?.firstName || 'FirstName'} {currentUser?.lastName || 'LastName'}
                                        <Button onClick={()=>navigate('/chat')} variant='ghost' size='icon' className="ml-2 cursor-pointer" ><MessageCircle/></Button>
                                    </h3>
                                    <h4 className="font-medium text-xl text-gray-600 ">{currentUser?.username || 'Username'}</h4>
                                    <p className="font-light text-sm text-gray-500 mt-4 ">{currentUser?.bio || 'No bio found.'}</p>
                                    <FriendButton user={currentUser as User} />
                                </div>
                                :
                                <>
                                    <div className="w-full mb-4 ">
                                        <h3 className="text-lg font-medium text-foreground">Basic Details</h3>
                                        <div className="mt-4 mb-1 grid grid-cols-2 gap-4">
                                            <div className="col-span-1 form-group mb-2">
                                                <label htmlFor="firstName" className="block text-sm mb-2">
                                                    First Name:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formData?.firstName || ""}
                                                    onChange={onChange}
                                                    placeholder="John"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="col-span-1 form-group mb-2">
                                                <label htmlFor="lastName" className="block text-sm mb-2">
                                                    Last Name:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formData?.lastName || ""}
                                                    onChange={onChange}
                                                    placeholder="Doe"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 mb-1 grid grid-cols-2 gap-4">
                                            <div className="col-span-1 form-group mb-2">
                                                <label htmlFor="username" className="block text-sm mb-2">
                                                    Username:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    value={loggedUser?.username}
                                                    disabled
                                                    onChange={onChange}
                                                    placeholder="johndoe"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                            <div className="col-span-1 form-group mb-2">
                                                <label htmlFor="email" className="block text-sm mb-2">
                                                    Email:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    value={loggedUser?.email}
                                                    disabled
                                                    onChange={onChange}
                                                    placeholder="johndoe@example.com"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4 mb-1 grid grid-cols-1 gap-4">
                                            <div className="col-span-1 form-group mb-2">
                                                <label htmlFor="username" className="block text-sm mb-2">
                                                    Bio:
                                                </label>
                                                <textarea
                                                    className="w-full h-full border border-gray-300 bg-white rounded-lg p-4 text-black text-lg resize-none"
                                                    id="bio"
                                                    name="bio"
                                                    value={formData?.bio}
                                                    onChange={onChange}
                                                    placeholder="Hi! It's me!"
                                                    rows={4}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center mt-8">
                                            <Button
                                                type="submit"
                                                disabled={loading.profile}
                                                onClick={onUpdateProfile}
                                                className="font-bold "
                                            >
                                                {loading.profile ? 'Processing...' : 'Update Profile'}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <h3 className="text-lg font-medium text-foreground">Update Password</h3>
                                        <div className="mt-4 mb-1 grid grid-cols-2 gap-4">
                                            <div className="col-span-1 form-group mb-2">
                                                <label htmlFor="password" className="block text-sm mb-2">
                                                    Old Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword.oldPassword ? "text" : "password"}
                                                        onChange={onChange}
                                                        value={formData.oldPassword}
                                                        name="oldPassword"
                                                        placeholder="Old Password"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded pr-12"
                                                    />
                                                    {
                                                        showPassword.oldPassword
                                                            ? <Eye onClick={() => toggleShowPassword('oldPassword')} className="h-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4" />
                                                            : <EyeOff onClick={() => toggleShowPassword('oldPassword')} className="h-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4" />
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-span-1 form-group mb-2">
                                                <label htmlFor="password" className="block text-sm mb-2">
                                                    New Password
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword.newPassword ? "text" : "password"}
                                                        onChange={onChange}
                                                        value={formData.newPassword}
                                                        name="newPassword"
                                                        placeholder="New Password"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded pr-12"
                                                    />
                                                    {
                                                        showPassword.newPassword
                                                            ? <Eye onClick={() => toggleShowPassword('newPassword')} className="h-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4" />
                                                            : <EyeOff onClick={() => toggleShowPassword('newPassword')} className="h-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end items-center">
                                            <Button
                                                type="submit"
                                                disabled={loading.password}
                                                onClick={onUpdatePassword}
                                                className="font-bold "
                                            >
                                                {loading.password ? 'Processing...' : 'Update Password'}
                                            </Button>
                                        </div>
                                    </div>
                                </>
                        }

                        <SuggestedFriends />

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile