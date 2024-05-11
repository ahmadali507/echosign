import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {

  ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
  const navigate = useNavigate()

  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  const [formData, setFormData] = useState('');

  ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  }
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('formData', formData)
  }

  ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////
  return (
    <div style={{ height: 'calc(100vh - 5rem)' }} className="bg-gradient-to-b  bg-blue-500 flex justify-center items-center h-screen">
      <div className="container bg-green-300 mt-16 mb-8 mx-auto p-8 pb-4 w-96 rounded-lg shadow-md border border-black">
        <h1 className="text-center font-sans font-bold text-4xl">Forget Password</h1>
        <form onSubmit={onSubmit} id="signin-form">
          <div className="form-group mb-2">
            <label htmlFor="email" className="block text-lg mb-2">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData}
              onChange={onChange}
              placeholder="Echo Sign"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded cursor-pointer hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
        <p className="mt-2 flex justify-center w-full">
          <button
            onClick={() => navigate(-1)}
            className="underline text-blue-800"
          >
            Go Back
          </button>
        </p>
        <div id="message" className="text-center"></div>
      </div>
    </div>
  );
};

export default ForgetPassword