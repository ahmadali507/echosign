import { ChangeEvent, useEffect, useState } from "react"

const Contact = () => {
  ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName:"",
    phone: "",
    message:"",
    isInquiry: false,
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
          <h1 className="text-center font-sans font-bold text-4xl">Contact Us</h1>
          <form id="contactus-form">
            <div className="form-group mb-2">
              <label htmlFor="name" className="block text-lg mb-1">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Echo Sign"
                required
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
                placeholder="Echo Sign"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="companyName" className="block text-lg mb-2">
                Company Name:
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={onChange}
                placeholder="Echo Sign"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="form-group mb-2">
              <label htmlFor="phone" className="block text-lg mb-2">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="XXXX XXXXXX X"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>

            <div className="form-group mb-2 flex items-center">
              <label htmlFor="isInquiry" className="text-lg">
                Inquiry
              </label>
              <input type="checkbox" id="inquiry" name="inquiry" className="mr-2" />
            </div>

            <div className="form-group mb-2">
              <label htmlFor="message" className="block text-lg mb-2">
                Message:
              </label>
              <input
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={onChange}
                placeholder="Type your message here"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
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

export default Contact