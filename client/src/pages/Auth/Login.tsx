import { ChangeEvent, useEffect, useState } from "react";

const Login = () => {
  ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  const [formData, setFormData] = useState({ email: "", password: "" });

  ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  ///////////////////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////////////////
  const PasswordToggle = ({ id }: { id: string }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          name={id}
          onChange={onChange}
          placeholder="Password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded pr-12"
        />
        <img
          id={`c-eye-${id}`}
          src={
            showPassword ? "src/eye-regular.svg" : "src/eye-slash-regular.svg"
          }
          alt="Toggle Password Visibility"
          className="h-4 pass-icon cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4"
          onClick={togglePasswordVisibility}
        />
      </div>
    );
  };

  ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////
  return (
    <div className="bg-gradient-to-b from-green-300 to-blue-500 items-center min-h-screen">
      <div className="fixed top-0 left-0 w-full h-14 bg-white border border-black z-10">
        <img
          src="src/EchoSign.ico"
          alt="Image"
          className="fixed top-1 left-1 w-36 h-11 z-10"
        />
        <div className="container bg-green-300 mt-32 mb-8 mx-auto p-8 pb-4 w-96 rounded-lg shadow-md border border-black">
          <h1 className="text-center font-sans text-4xl font-bold">Login</h1>
          <form id="login-form">
            <div className="form-group mb-3">
              <label htmlFor="email" className="block text-lg mb-2">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                placeholder="username@gmail.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
                onChange={onChange}
              />
            </div>
            <div className="form-group mb-3 relative">
              <label htmlFor="password" className="block text-lg mb-2">
                Password
              </label>
              <PasswordToggle id="password" />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          <p className="mt-6">
            Don't have an account?{" "}
            <a
              href="http://127.0.0.1:5500/Login.html"
              className="underline text-blue-800"
            >
              Sign In
            </a>
          </p>
          <p>
            <a
              href="http://127.0.0.1:5500/Login.html"
              className="underline text-blue-800 text-center mt-6"
            >
              Forgot password
            </a>
          </p>
          <div id="message" className="text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
