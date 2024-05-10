import { ChangeEvent, useEffect, useState } from "react"

const Register = () => {
  ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isASL: false,
    isTOFSAccepted: false,
  });

  ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to:`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  ///////////////////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////////////////
  const PasswordToggle = ({ id }: { id: string }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }
    
    return (
      <div className="relative">
        <input
        type={showPassword ? "text" : "password"}
        id={id}
        onChange={onChange}
        name={id}
        value={id == "password" ? formData.password : formData.confirmPassword}
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
    <div className="bg-gradient-to-b from-green-300 to-blue-500 flex justify-center items-center h-screen">
      <div className="fixed top-0 left-0 w-full h-14 bg-white border border-black z-10">
        <img
          src="src/EchoSign.ico"
          alt="Image"
          className="fixed top-1 left-1 w-36 h-11 z-10"
        />
        <div className="container bg-green-300 mt-16 mb-8 mx-auto p-8 pb-4 w-96 rounded-lg shadow-md border border-black">
          <h1 className="text-center font-sans font-bold text-4xl">Sign In</h1>
          <form id="signin-form">
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
                placeholder="Echo Sign"
                required
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
                placeholder="Echo Sign"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="form-group mb-3 relative">
              <label htmlFor="password" className="block text-lg mb-2">
                Password
              </label>
              <PasswordToggle id="password" />
            </div>
            <div className="form-group mb-3 relative">
              <label htmlFor="password" className="block text-lg mb-2">
                Confirm Password
              </label>
              <PasswordToggle id="confirmPassword" />
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
                required
                className="mr-2"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
          <p className="mt-2">
            Already have an account?{" "}
            <a
              href="http://127.0.0.1:5500/Login.html"
              className="underline text-blue-800"
            >
              Login
            </a>
          </p>
          <div id="message" className="text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default Register