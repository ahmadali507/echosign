import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";

const VerifyEmail = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
    const navigate = useNavigate()

    ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
    const [otp, setOtp] = useState<string>("");

    ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////
    return (
        <div style={{ height: 'calc(100vh - 4rem)' }} className="bg-gradient-to-b from-green-300 to-blue-500 flex justify-center items-center h-screen">
            <div className="container bg-green-300 mt-16 mb-8 mx-auto p-8 pb-4 w-96 rounded-lg shadow-md border border-black">
                <h1 className="text-center font-sans font-bold text-4xl">Forget Password</h1>
                <form onSubmit={onSubmit} id="signin-form">
                    <div className="form-group mb-2">
                        <OTPInput
                            value={otp}
                            onChange={(o) => setOtp(o)}
                            numInputs={5}
                            inputType="number"
                            renderSeparator={<span className="mx-1"> </span>}
                            renderInput={(props) => (
                                <div className="md:w-16 md:h-16 w-12 h-12">
                                    <input
                                        {...props}
                                        style={{}}
                                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                        type="text"
                                    />
                                </div>
                            )}
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

export default VerifyEmail