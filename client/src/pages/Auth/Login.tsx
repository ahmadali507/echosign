import { Eye, EyeOff } from "lucide-react";
import { registeration } from "@/assets";
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom";

const Login = () => {

  ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  const [formData, setFormData] = useState({ usernameOrEmail: "", password: "", });
  const [showPassword, setShowPassword] = useState(false)

  ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('formData', formData)
  }

  const toggleShowPassword = () => {
    setShowPassword(pre => !pre)
  }

  ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////
  return (
    <div className="bg-gradient-to-b from-blue-500 to-white flex items-center">
      <img src={registeration} alt="Image" className="ml-36 w-3/12 z-10"/>

      <div style={{ height: 'calc(100vh - 4rem)' }} className="ml-72 flex justify-center items-center h-screen mb-14 ">
      <div className="container bg-green-300 mt-16 mb-8 mx-auto p-8 pb-4 w-96 rounded-lg shadow-md border border-black">
        <h1 className="text-center font-sans font-bold text-4xl">Login</h1>
        <form onSubmit={onSubmit} id="signin-form">
          <div className="form-group mb-2">
            <label htmlFor="usernameOrEmail" className="block text-lg mb-2">
              Email/Username:
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
            className="mb-2 w-full px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
        <Link to='/forget-password' className='text-blue-700 hover:underline' >Forget Password?</Link>
        <p className="mt-1">
          Don't have account?{" "}
          <Link
            to="/register"
            className="underline text-blue-800"
          >
            Register
          </Link>
        </p>
        <div id="message" className="text-center"></div>
      </div>
    </div>
    </div>
  );
};

export default Login