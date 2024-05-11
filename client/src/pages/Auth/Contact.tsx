import { ChangeEvent, useEffect, useState } from "react"
import {contact} from '@/assets'

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
    <div className="bg-gradient-to-b from-blue-500 to-white min-h-screen flex flex-col items-center justify-center">
    <img src={contact} alt="Contact" className="w-36 mb-8" />
    <div className="container bg-green-300 p-8 pb-4 rounded-lg shadow-md border border-black">
      <h1 className="text-center font-sans font-bold text-4xl mb-4">Contact Us</h1>
      <div id="contactus-form">
        <div className="form-group mb-4">
                    <label htmlFor="name" className="block text-lg mb-1">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block text-lg mb-1">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        placeholder="Your Email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="companyName" className="block text-lg mb-1">Company Name:</label>
                    <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={onChange}
                        placeholder="Company Name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="phone" className="block text-lg mb-1">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={onChange}
                        placeholder="Your Phone Number"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="form-group mb-4 flex items-center">
                    <label htmlFor="isInquiry" className="text-lg">Inquiry</label>
                    <input type="checkbox" id="inquiry" name="inquiry" className="mr-2" />
                </div>
                <div className="form-group mb-4">
                    <label htmlFor="message" className="block text-lg mb-1">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        placeholder="Type your message here"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="form-group mb-4 flex items-center">
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
                    Send
                </button>
            </div>
        </div>
    </div>




  );
};

export default Contact