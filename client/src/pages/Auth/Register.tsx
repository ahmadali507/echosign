import { User } from "@/interfaces";
import { register } from "@/store/reducers/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

  ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
  const dispatch = useDispatch()
  const navigate = useNavigate()

  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "", isASL: false, isTOFSAccepted: false, });
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false })

  ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch<any>(register(formData)).then(({ payload }: { payload: User }) => {

      console.log('payload', payload)

      if (payload) {
        localStorage.setItem('email', formData.email)
        navigate('/verify')
      }

    })
      .catch((err) => {
        console.log(err)
      })

  }

  const toggleShowPassword = (name: 'password' | 'confirmPassword') => {
    setShowPassword(pre => ({ ...pre, [name]: !pre[name] }))
  }

  ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////
  return (
    <div style={{ height: 'calc(100vh - 4rem)' }} className="bg-gradient-to-b from-green-300 to-blue-500 flex justify-center items-center h-screen">
      <div className="container bg-green-300 mt-16 mb-8 mx-auto p-8 pb-4 w-96 rounded-lg shadow-md border border-black">
        <h1 className="text-center font-sans font-bold text-4xl">Register</h1>
        <form onSubmit={onSubmit} id="signin-form">
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
          <div className="form-group mb-2 flex items-center">
            <label htmlFor="ASL" className="text-lg">
              I use ASL / I can understand ASL
            </label>
            <input type="checkbox" id="ASL" name="ASL" className="mr-2" />
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
          <div className="form-group mb-2 flex items-center">
            <label htmlFor="check" className="text-lg">
              I agree to the{" "}
              <span className="underline text-blue-800">
                <a href="#">Terms & Conditions</a>
              </span>
            </label>
            <input
              type="checkbox"
              id="check"
              name="check"
              className="mr-2"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            to='/login'
            className="underline text-blue-800"
          >
            Login
          </Link>
        </p>
        <div id="message" className="text-center"></div>
      </div>
    </div>
  );
};

export default Register