/* eslint-disable @typescript-eslint/no-explicit-any */
import { register } from "@/store/reducers/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { registeration } from "@/assets";
import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@/interfaces";
import toast from "react-hot-toast";

const Register = () => {

  ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialData = { username: "", email: "", password: "", confirmPassword: "", isASL: false, isTOFSAccepted: false, }

  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false })
  const [loading, setLoading] = useState(false)

  ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData?.username) return toast.error('Username is required.')
      if (!formData?.email) return toast.error('Email is required.')
    if (!formData?.password) return toast.error('Password is required.')
    if (formData?.password != formData?.confirmPassword) return toast.error('Password and Confirm Password should be same.')

    setLoading(true)
    dispatch<any>(register(formData))
      .then(({ payload }: { payload: User }) => {
        if (payload) {
          navigate('/dashboard')
          setFormData({ username: "", email: "", password: "", confirmPassword: "", isASL: false, isTOFSAccepted: false, })
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })

  }

  const toggleShowPassword = (name: 'password' | 'confirmPassword') => {
    setShowPassword(pre => ({ ...pre, [name]: !pre[name] }))
  }

  ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////
  return (
    <div className="bg-white grid grid-cols-2">
      <div className="col-span-1 w-full h-full flex items-center ">
        <img src={registeration} alt="Image" className="ml-20 w-8/12 z-10" />
      </div>
      <div style={{ height: 'calc(100vh - 5rem)' }} className="col-span-1 flex justify-end items-center h-screen mb-14 mt-6">
        <div className="container mt-16 mb-8 mx-auto p-8 pb-4 w-[32rem] rounded-lg shadow-md border border-black">
          <h1 className="text-center font-sans font-bold text-4xl mb-12 ">Register</h1>
          <form onSubmit={onSubmit} id="signin-form" className="flex flex-col gap-2" >
            <div className="form-group mb-2">
              <label htmlFor="username" className="block text-lg mb-1">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={onChange}
                placeholder="johndoe"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="email" className="block text-lg mb-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="johndoe@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="form-group mb-3 relative">
              <label htmlFor="password" className="block text-lg mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.password ? "text" : "password"}
                  onChange={onChange}
                  value={formData.password}
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded pr-12"
                />
                {
                  showPassword.password
                    ? <Eye onClick={() => toggleShowPassword('password')} className="h-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4" />
                    : <EyeOff onClick={() => toggleShowPassword('password')} className="h-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4" />
                }
              </div>
            </div>
            <div className="form-group mb-3 relative">
              <label htmlFor="password" className="block text-lg mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  onChange={onChange}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded pr-12"
                />
                {
                  showPassword.confirmPassword
                    ? <Eye onClick={() => toggleShowPassword('confirmPassword')} className="h-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4" />
                    : <EyeOff onClick={() => toggleShowPassword('confirmPassword')} className="h-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4" />
                }
              </div>
            </div>
            <div className="flex flex-col">
              <div className="form-group mb-1 flex items-center">
                <label htmlFor="ASL" className="text-xs text-muted-foreground ">I use ASL / I can understand ASL</label>
                <input type="checkbox" id="ASL" name="ASL" className="ml-2" />
              </div>
              <div className="form-group text-xs text-muted-foreground">
                <label htmlFor="check" className="text-sm">
                  I agree to the{" "}
                  <Link to="/" className="text-foreground underline " >Terms & Conditions</Link>
                </label>
                <input
                  type="checkbox"
                  id="check"
                  name="check"
                  className="ml-2"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-green text-white font-bold rounded cursor-pointer hover:bg-green/70 disabled:bg-green/50 disabled:cursor-not-allowed "
            >
              {loading ? 'Processing...' : 'Register'}
            </button>
          </form>
          <p className="mt-4 text-center ">
            Already have an account?{" "}
            <Link to='/login' className="underline text-foreground hover:text-green">
              Login
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Register