import { ChangeEvent, useEffect, useState } from "react";


const ChangePassword = () => {
  ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
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
          onChange={onChange}
          name={id}
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
        <div className="container bg-green-300 mt-32 mb-8 mx-auto p-8 pb-4 w-96 rounded-lg shadow-md border border-black">
          <h1 className="pb-3 text-center font-sans text-4xl font-bold ">
            Change Password
          </h1>
          <form id="changepassword-form">
            <div className="form-group mb-3 relative">
              <label htmlFor="password" className="block text-lg mb-2">
                Password
              </label>
              <PasswordToggle id="oldPassword" />
            </div>
            <div className="form-group mb-3 relative">
              <label htmlFor="password" className="block text-lg mb-2">
                Password
              </label>
              <PasswordToggle id="newPassword" />
            </div>
            <div className="form-group mb-3 relative">
              <label htmlFor="password" className="block text-lg mb-2">
                Password
              </label>
              <PasswordToggle id="confirmPassword" />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700"
            >
              Save
            </button>
          </form>
          <div id="message" className="text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
