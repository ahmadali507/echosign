import { ChangeEvent, useEffect, useState } from "react";

const ForgetPassword = () => {
  ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  const [formData, setFormData] = useState({ email: "" });

  ///////////////////////////////////////////////////////// USE EFFECT ///////////////////////////////////////////////////////////
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
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
        <div className="container bg-green-300 mt-56 mb-8 mx-auto p-8 pb-4 w-96 rounded-lg shadow-md border border-black">
          <h1 className="pb-3 text-center font-sans text-4xl font-bold ">
            Forgot Password
          </h1>
          <form id="forgotpassword-form">
            <div className="form-group mb-3">
              <label htmlFor="email" className="block text-lg mb-2 pl-1">
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
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700"
            >
              Send
            </button>
          </form>
          <div id="message" className="text-center"></div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
