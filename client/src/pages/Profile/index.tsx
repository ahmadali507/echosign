/* eslint-disable @typescript-eslint/no-explicit-any */
import { updatePassword, uploadImage } from "@/store/reducers/authSlice";
import { Camera, Eye, EyeOff, Upload } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "@/utils/Loader";
import { RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const Profile = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const imageRef = useRef(null)
    const { user } = useSelector((state: RootState) => state.auth)
    const initialData = { oldPassword: "", newPassword: "" }

    ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
    const [formData, setFormData] = useState(initialData);
    const [showPassword, setShowPassword] = useState({ oldPassword: false, newPassword: false })
    const [loading, setLoading] = useState(false)
    const [imageUploading, setImageUploading] = useState(false)
    const [image, setImage] = useState(user?.photoUrl)

    ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////
    useEffect(() => {
        setImage(user?.photoUrl)
    }, [user])

    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const onUpdatePassword = () => {

        if (!formData?.oldPassword) return toast.error('Old Password is required.')
        if (!formData?.newPassword) return toast.error('New Password is required.')

        setLoading(true)
        dispatch<any>(updatePassword(formData))
            .then(() => {
                setFormData(initialData)
            })
            .catch((err: any) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false)
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

            <div style={{ height: 'calc(80vh - 5rem)' }} className="col-span-1 flex justify-end items-center h-screen mb-14 mt-6">
                <div className="container mt-16 mb-8 mx-auto w-full">
                    <div id="signin-form" className="flex flex-col gap-2 w-full" >

                        <div className="flex justify-center items-center">
                            {
                                <div className='w-40 h-40 flex justify-center rounded-full' >
                                    {
                                        imageUploading
                                            ?
                                            <div className="w-full h-full bg-white shadow-md rounded-full relative flex justify-center items-center ">
                                                <Loader size="xl" />
                                            </div>
                                            :
                                            image
                                                ?
                                                <div className="w-full h-full relative flex justify-center items-center ">
                                                    <img src={image} alt="" className="rounded-full w-full h-full object-cover " />
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <Button size='icon' variant='outline' onClick={handleClick} className="rounded-full absolute top-0 right-0 flex justify-center items-center   " >
                                                                <Upload className="w-4 h-4" />
                                                            </Button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>Upload Picture</TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                :
                                                <div className="w-full h-full bg-muted rounded-full flex justify-center items-center" >
                                                    <button
                                                        onClick={handleClick}
                                                        className="flex flex-col justify-center items-center text-textGray"
                                                    >
                                                        <Camera style={{ fontSize: '36px' }} />
                                                        Upload Image
                                                    </button>
                                                </div>
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

                        <div className="w-full mb-4 ">
                            <h3 className="text-lg font-medium text-foreground">Basic Details</h3>
                            <div className="mt-4 mb-1 grid grid-cols-2 gap-4">
                                <div className="col-span-1 form-group mb-2">
                                    <label htmlFor="username" className="block text-sm mb-2">
                                        Username:
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={user?.username}
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
                                        value={user?.email}
                                        disabled
                                        onChange={onChange}
                                        placeholder="johndoe@example.com"
                                        className="w-full px-4 py-2 border border-gray-300 rounded"
                                    />
                                </div>
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
                                    disabled={loading}
                                    onClick={onUpdatePassword}
                                    className="font-bold "
                                >
                                    {loading ? 'Processing...' : 'Update'}
                                </Button>
                            </div>
                        </div>



                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile