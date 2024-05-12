/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff } from "lucide-react";
import { registeration } from "@/assets";
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/store/reducers/authSlice";
import { User } from "@/interfaces";
import toast from "react-hot-toast";

const Login = () => {

  ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const initialData = { usernameOrEmail: "", password: "", }

  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  const [formData, setFormData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData?.usernameOrEmail) return toast.error('Username or email is required.')
    if (!formData?.password) return toast.error('password is required.')

    setLoading(true)
    dispatch<any>(login(formData))
      .then(({ payload }: { payload: User }) => {
        if (payload) {
          navigate('/dashboard')
          setFormData(initialData)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const toggleShowPassword = () => {
    setShowPassword(pre => !pre)
  }

  ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////
  return (
    <div className="bg-white grid grid-cols-2">
      <div className="col-span-1 w-full h-full flex items-center ">
        <img src={registeration} alt="Image" className="ml-20 w-8/12 z-10" />
      </div>
      <div style={{ height: 'calc(100vh - 5rem)' }} className="col-span-1 flex justify-end items-center h-screen mb-14 mt-6">
        <div className="container mt-16 mb-8 mx-auto p-8 pb-4 w-[32rem] rounded-lg shadow-md border border-black">
          <h1 className="text-center font-sans font-bold text-4xl mb-12 ">Login</h1>
          <form onSubmit={onSubmit} id="signin-form" className="flex flex-col gap-6" >
            <div className="form-group mb-2">
              <label htmlFor="usernameOrEmail" className="block text-lg mb-2">
                Username or Email:
              </label>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={onChange}
                placeholder="Echo Sign"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="form-group mb-3 relative">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-lg mb-2">
                  Password
                </label>
                <Link to='/forget-password' className='text-muted-foreground hover:text-green hover:underline' >Forget Password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  onChange={onChange}
                  value={formData.password}
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded pr-12"
                />
                {
                  showPassword
                    ? <Eye onClick={toggleShowPassword} className="h-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4" />
                    : <EyeOff onClick={toggleShowPassword} className="h-4 cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4" />
                }
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-green text-white font-bold rounded cursor-pointer hover:bg-green/70 disabled:bg-green/50 disabled:cursor-not-allowed "
            >
              {loading ? 'Processing...' : 'Login'}
            </button>
          </form>
          <p className="mt-4 text-center ">
            Don't have account?{" "}
            <Link to='/register' className="underline text-muted-foreground hover:text-green">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login